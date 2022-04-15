const path = require('path');
const express = require('express');
const app = express();
const socketio = require('socket.io');
const server = require('http').createServer(app);
const io = socketio(server);
const port = 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

let count = 0;
io.on('connection', (socket) => {
  socket.on('increment', () => {
    count++;
    // emit in real time only to the client that triggers the event
    // socket.emit('countUpdated', count);
    
    // emit in real time to all clients
    io.emit('countUpdated', count);
  });
});

server.listen(port, console.log(`server listening on port ${port}`));
