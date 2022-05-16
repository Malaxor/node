const socket = io();
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  socket.emit('sendMessage', e.target.message.value);
  e.target.message.value = '';
});

socket.on('message', (message) => {
  console.log(message);
});
