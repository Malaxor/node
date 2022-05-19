const socket = io();
const $messageForm = document.querySelector('.message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationBtn = document.querySelector('.send-location-btn');
const $messages = document.querySelector('.chat__messages');
const $sidebar = document.querySelector('.chat__sidebar');

// templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

// joining a chat room
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });
socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = '/';
  }
});

// receive message/location
socket.on('message', ({ username, message, createdAt }) => {
  const html = Mustache.render(messageTemplate, { 
    username,
    message,
    createdAt: moment(createdAt).format('h:mm a')
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('location', ({ username, url, createdAt }) => {
  const html = Mustache.render(locationTemplate, { 
    username,
    url,
    createdAt: moment(createdAt).format('h:mm a')
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('roomData', ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, { 
    room,
    users
  });
  $sidebar.innerHTML = html;
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
