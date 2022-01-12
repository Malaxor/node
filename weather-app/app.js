const request = require('request');
const geocode = require('./utils/geocode');
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


geocode('Philadelphia', (err, data) => {
  log(err)
  log(data)
});