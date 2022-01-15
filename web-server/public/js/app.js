const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const { value: location } = search;

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});