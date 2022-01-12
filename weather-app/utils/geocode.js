const request = require('request');

const geocode = (address, callback) => {
  const accessToken = 'pk.eyJ1IjoibWFsYXhvciIsImEiOiJja3lhaXo5MDIwNjNyMndvbmowOXcxb3FjIn0.d-47hI6Dbi_3O32zmd0GBw';
  const queryStr = `access_token=${accessToken}&limit=1`;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?${queryStr}`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback('Unable to connect to location services', undefined);
    } else if (!res.body.features.length) {
      callback('Unable to find location.', undefined);
    } else {
      const { place_name: location, center: [ long, lat ] } = res.body.features[0];
      callback(undefined, { long, lat, location });
    }
  });
}
module.exports = geocode;
