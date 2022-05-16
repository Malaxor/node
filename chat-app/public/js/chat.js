const socket = io();
const form = document.querySelector('form');
const locationBtn = document.querySelector('.send-location');

form.addEventListener('submit', e => {
  e.preventDefault();
  if (e.target.message.value) {
    socket.emit('sendMessage', e.target.message.value, (error) => {
      if (error) {
        return console.log(error);
      }
      console.log('message delivered');
    });
    e.target.message.value = '';
  }
});

locationBtn.addEventListener('click', function () {
  if (!navigator.geolocation) {
    return alert('geolocation is not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit('shareLocation', { latitude, longitude }, (message) => {
      console.log(message)
    });
  });
});

socket.on('location', (location) => {
  console.log(location);
})

socket.on('message', (message) => {
  console.log(message);
});
