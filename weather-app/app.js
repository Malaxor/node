const { geocode, forecast} = require('./utils');
const address = process.argv[2];
const { log } = console;

if (address) {
  geocode(address, (err, data) => {
    if (err) {
      return log(err);
    }
    const { lat, long, location } = data;
    forecast(lat, long, (err, forecastData) => {
      if (err) {
        return log(err);
      }
      log(`${location}:`);
      log(forecastData);
    });
  });
} else {
  log('Please provide an address.')
}