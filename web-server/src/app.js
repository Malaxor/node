const path = require('path');
const hbs = require('hbs');
const express = require('express');
const app = express();
const port = 3000;

// define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');
// any HTML page can be viewed by visiting the base URL plus the file's name (ex: localhost:3000, localhost:3000/about)
// the index.html file is served without needing the extensions object, but other html pages require it
app.use(express.static(publicDirectoryPath, { extensions: ['html'] })); // setup static directory

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

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
    message: 'this is an example message for the help page.',
    title: 'Help',
    name: 'Philip Costache'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Please provide an address.' });
  }
  res.send({
    address: req.query.address
  });
});


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Philip Costache',
    errorMessage: 'Help article not found.'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Philip Costache',
    errorMessage: 'Page not found.'
  });
});

app.listen(port, () => console.log(`app listening on port ${port}`));