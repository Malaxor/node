const path = require('path');
const express = require('express');
const app = express();
const socketio = require('socket.io');
const server = require('http').createServer(app);
const io = socketio(server);
const port = 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
  // emit to every connected client except the client emitter
  socket.broadcast.emit('message', 'A new user has joined.');
  // socket.emit(): emit to new client connection
  // io.emit(): emit in real time to all clients
  socket.on('sendMessage', message => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left');
  });
});

server.listen(port, console.log(`server listening on port ${port}`));
