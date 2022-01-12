const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Weather</h1>');
});

app.get('/help', (req, res) => {
  res.send([{ name: 'Philip'}, { name: 'Christine' }]);
});

app.get('/about', (req, res) => {
  res.send('<h1>About</h1>');
});

app.get('/weather', (req, res) => {
  res.send({ forecast: 'cloudy', location: 'Detroit' });
});

app.listen(port, () => console.log(`app listening on port ${port}`));