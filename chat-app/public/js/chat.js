const socket = io();
const $messageForm = document.querySelector('.message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationBtn = document.querySelector('.send-location-btn');
const $messages = document.querySelector('.messages');

// templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

// joining a chat room
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });
socket.emit('join', { username, room }, (error) => {
  alert(error);
  location.href = '/';
});

// receive message/location
socket.on('message', ({ message, createdAt }) => {
  const html = Mustache.render(messageTemplate, { 
    message,
    createdAt: moment(createdAt).format('h:mm a')
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('location', ({ url, createdAt }) => {
  const html = Mustache.render(locationTemplate, { 
    url,
    createdAt: moment(createdAt).format('h:mm a')
  });
  $messages.insertAdjacentHTML('beforeend', html);
});


// send message/location
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

$sendLocationBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('geolocation is not supported by your browser');
  }
  $sendLocationBtn.disabled = true;
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit('shareLocation', { latitude, longitude }, (message) => {
      $sendLocationBtn.disabled = false;
    });
  });
});
