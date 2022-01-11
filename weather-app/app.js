const request = require('request');
const { log } = console;

// // weatherstack api 
// const accessKey = '4470fc804c8962986009bddb66213765';
// let units = 'f';
// const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=37.8267,-122.4233&units=${units}`;

// request({ url, json: true }, (err, res) => {
//   const { temperature, feelslike, weather_descriptions } = res.body.current;
//   log(`${weather_descriptions[0]}. The temperature is ${temperature} degrees. It feels like ${feelslike} degrees.`);
// });


// mapbox api
const accessToken = 'pk.eyJ1IjoibWFsYXhvciIsImEiOiJja3lhaXo5MDIwNjNyMndvbmowOXcxb3FjIn0.d-47hI6Dbi_3O32zmd0GBw';
let searchText = 'Detroit';
const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${accessToken}&limit=1`;

request({ url, json: true }, (err, res) => {
  const [ long, lat ] = res.body.features[0].center;
  log(lat);
  log(long)
})