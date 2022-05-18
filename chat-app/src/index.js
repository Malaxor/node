const path = require('path');
const express = require('express');
const app = express();
const socketio = require('socket.io');
const server = require('http').createServer(app);
const io = socketio(server);
const Filter = require('bad-words');
const { generateMessage, generateLocation } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');
const port = 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
  // socket.broadcast.emit(): emit to every connected client except the client emitter
  // socket.emit(): emit to new client connection
  // io.emit(): emit in real time to all clients

  socket.on('join', ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });
    if (error) {
      return callback(error);
    }
    socket.join(user.room);
    socket.emit('message', generateMessage('Welcome!'));
    socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined.`));
    // callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('profanity is disallowed');
    }
    io.to('boats').emit('message', generateMessage(message));
    callback();
  });

  socket.on('shareLocation', ({ latitude, longitude }, callback) => {
    io.emit('location', generateLocation(latitude, longitude));
    callback('location shared');
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', generateMessage(`${user.username} has left`));
    }
  });
});

server.listen(port, console.log(`server listening on port ${port}`));
