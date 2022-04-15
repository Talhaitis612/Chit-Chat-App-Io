//Server
let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);
let transcript = [];

const port = process.env.PORT || 3000;
//Make Coonection
io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
        console.log('user joined')
    });
// Emit Message
    socket.on('message', (data) => {
      io.in(data.room).emit('new message', {user: data.user, message: data.message, room: data.room});
      data.timestamp = Date.now();
        transcript.push(data);
        socket.emit('transcript', {transcript})
        console.log({transcript});
        // console.log(`${data.user} : ${data.message}`)
    });
    socket.emit('new message', {transcript})
    socket.emit('transcript', {transcript})
});

// Server listening on port
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});


