const request = require('request');

const forecast = (lat, long, callback) => {
  const accessKey = '4470fc804c8962986009bddb66213765';
  let unit = 'f';
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${lat},${long}&units=${unit}`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback('Unable to connect to weatherstack.')
    } else if (res.body.error) {
      callback('Unable to find location.');
    } else {
      const { temperature, feelslike, weather_descriptions } = res.body.current;
      const message = `${weather_descriptions[0]}. The temperature is ${temperature} degrees. It feels like ${feelslike} degrees.`;
      callback(undefined, message);
    }
  });
}
module.exports = forecast;
