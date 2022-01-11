const request = require('request');
const { log } = console;

const url = 'http://api.weatherstack.com/current?access_key=4470fc804c8962986009bddb66213765&query=37.8267,-122.4233';
request({ url }, (err, res) => {
  const data = JSON.parse(res.body);
  log(data.current)
});