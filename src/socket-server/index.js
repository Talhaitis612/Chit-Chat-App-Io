let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

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
        io.in(data.room).emit('new message', {user: data.user, message: data.message});
        console.log(`${data.user} : ${data.message}`)
    });
});

// Server listening on port
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/<name-of-app>'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/<name-of-app>/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
