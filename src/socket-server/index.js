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
        socket.broadcast.to(data.room).emit('user joined ok!');
        console.log('user joined server')
    });
// Emit Message
    // Function calls on new message
    socket.on('message', (data) => {
      data.timestamp = Date.now();
      io.in(data.room).emit('new message', {user: data.user, message: data.message, room: data.room, timestamp: data.timestamp});
        transcript.push(data);
        console.log(transcript)
    });
    // Function calls on every new message
    socket.emit('new message', {transcript})
    // Function calls on every reload
    socket.emit('transcript', {transcript})
});

// Server listening on port
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});


