const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

// define paths for express configuration
const viewsPath = path.join(__dirname, '../templates')
const publicDirectoryPath = path.join(__dirname, '../public');
// the about and help html pages are viewed at /about and /index by adding the extensions object
// the index html is served without needing the extensions object
app.use(express.static(publicDirectoryPath, { extensions: ['html'] })); // setup static directory

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Philip Costache'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Philip Costache'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'this is an example message for the help page.'
  });
});


app.get('/weather', (req, res) => {
  res.send({ forecast: 'cloudy', location: 'Detroit' });
});

app.listen(port, () => console.log(`app listening on port ${port}`));