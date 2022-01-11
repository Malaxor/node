const request = require('request');
const { log } = console;

const accessKey = '4470fc804c8962986009bddb66213765';
let units = 'f';
const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=37.8267,-122.4233&units=${units}`;

request({ url, json: true }, (err, res) => {
  const { temperature, feelslike, weather_descriptions } = res.body.current;
  log(`${weather_descriptions[0]}. The temperature is ${temperature} degrees. It feels like ${feelslike} degrees.`);
});