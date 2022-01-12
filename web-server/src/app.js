const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello express!');
});

app.get('/help', (req, res) => {
  res.send('help page');
});

app.get('/about', (req, res) => {
  res.send('about page');
});

app.get('/weather', (req, res) => {
  res.send('weather page');
});

app.listen(port, () => console.log(`app listening on port ${port}`));