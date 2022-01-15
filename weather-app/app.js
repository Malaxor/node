const { geocode, forecast} = require('./utils');
const address = process.argv[2];
const { log } = console;

if (address) {
  geocode(address, (err, { lat, long, location } = {}) => {
    if (err) {
      return log(err);
    }
    forecast(lat, long, (err, weatherMsg) => {
      if (err) {
        return log(err);
      }
      log(`${location}:`);
      log(currentWeather);
    });
  });
} else {
  log('Please provide an address.')
}