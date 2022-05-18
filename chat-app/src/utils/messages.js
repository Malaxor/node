const generateMessage = (username, message) => {
  return {
    username,
    message,
    createdAt: new Date().getTime()
  };
}

const generateLocation = (username, latitude, longitude) => {
  return {
    username,
    url: `https://google.com/maps?${latitude},${longitude}`,
    createdAt: new Date().getTime()
  };
}

module.exports = {
  generateMessage,
  generateLocation
};