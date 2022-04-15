const socket = io();

socket.on('countUpdated', (count) => {
  console.log('the count is updated:', count);
});

document.getElementById('increment').addEventListener('click', function () {
  socket.emit('increment');
});