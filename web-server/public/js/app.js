const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const { value: location } = search;
  
  messageOne.textContent = 'loading...'
  messageTwo.textContent = '';

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(res => res.json())
    .then(({ error, location, weatherMsg }) => {
      if (error) {
        messageOne.textContent = error;
        setTimeout(() =>{
          messageOne.textContent = '';
        }, 2500)
      } else {
        messageOne.textContent = `${location}.`;
        messageTwo.textContent = weatherMsg;
      }
    });
});