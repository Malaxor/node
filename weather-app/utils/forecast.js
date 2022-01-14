const request = require('request');

const forecast = (lat, long, callback) => {
  const accessKey = '4470fc804c8962986009bddb66213765';
  const unit = 'f';
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${lat},${long}&units=${unit}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weatherstack.')
    } else if (body.error) {
      callback('Unable to find location.');
    } else {
      const { temperature, feelslike, weather_descriptions: [ firstDesc ] } = body.current;
      const weatherMsg = `${firstDesc}. The temperature is ${temperature} degrees. It feels like ${feelslike} degrees.`;
      callback(undefined, weatherMsg);
    }
  });
}
module.exports = forecast;
