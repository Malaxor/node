const request = require('request');
const { log } = console;

// weatherstack api 
// const accessKey = '4470fc804c8962986009bddb66213765';
// let unit = 'f';
// const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=37.8267,-122.4233&units=${unit}`;

// request({ url, json: true }, (err, res) => {
//   if (err) {
//     log('Unable to connect to weatherstack.')
//   } else if (res.body.error) {
//     log('Unable to find location.');
//   } else {
//     const { temperature, feelslike, weather_descriptions } = res.body.current;
//     log(`${weather_descriptions[0]}. The temperature is ${temperature} degrees. It feels like ${feelslike} degrees.`);
//   }
// });


// mapbox api
const accessToken = 'pk.eyJ1IjoibWFsYXhvciIsImEiOiJja3lhaXo5MDIwNjNyMndvbmowOXcxb3FjIn0.d-47hI6Dbi_3O32zmd0GBw';
let searchText = 'Buftea';
const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${accessToken}&limit=1`;

request({ url, json: true }, (err, res) => {
  if (err) {
    log('Unable to connect to mapbox.');
  } else if (!res.body.features.length) {
    log('Unable to find location.');
  } else {
    const [ long, lat ] = res.body.features[0].center;
    log(lat);
    log(long)
  }
})