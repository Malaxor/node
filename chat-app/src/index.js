const path = require('path');
const express = require('express');
const app = express();
const socketio = require('socket.io');
const server = require('http').createServer(app);
const io = socketio(server);
const Filter = require('bad-words');
const { generateMessage, generateLocation } = require('./utils/messages');
const port = 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
  socket.emit('message', generateMessage('Welcome!'));
  // emit to every connected client except the client emitter
  socket.broadcast.emit('message', generateMessage('A new user has joined.'));
  // socket.emit(): emit to new client connection
  // io.emit(): emit in real time to all clients
  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('profanity is disallowed');
    }
    io.emit('message', generateMessage(message));
    callback();
  });

  socket.on('shareLocation', ({ latitude, longitude }, callback) => {
    io.emit('location', generateLocation(latitude, longitude));
    callback('location shared');
  });

  socket.on('disconnect', () => {
    io.emit('message', generateMessage('A user has left'));
  });
});

server.listen(port, console.log(`server listening on port ${port}`));
