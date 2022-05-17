const socket = io();
const $messageForm = document.querySelector('.message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationBtn = document.querySelector('.send-location-btn');

$messageForm.addEventListener('submit', e => {
  e.preventDefault();
  if ($messageFormInput.value) {
    $messageFormButton.setAttribute('disabled', 'disabled');

    socket.emit('sendMessage', $messageFormInput.value, (error) => {
      $messageFormButton.removeAttribute('disabled');
      $messageFormInput.value = '';
      $messageFormInput.focus();
      if (error) {
        return console.log(error);
      }
      console.log('message delivered');
    });  
  }
});

$sendLocationBtn.addEventListener('click', function () {
  if (!navigator.geolocation) {
    return alert('geolocation is not supported by your browser');
  }
  $sendLocationBtn.disabled = true;
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit('shareLocation', { latitude, longitude }, (message) => {
      console.log(message);
      $sendLocationBtn.disabled = false;
    });
  });
});

socket.on('location', (location) => {
  console.log(location);
})

socket.on('message', (message) => {
  console.log(message);
});
