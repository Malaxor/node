const generateMessage = (message) => {
  return {
    message,
    createdAt: new Date().getTime()
  }
}

const generateLocation = (latitude, longitude) => {
  return {
    url: `https://google.com/maps?${latitude},${longitude}`,
    createdAt: new Date().getTime()
  }
}

module.exports = {
  generateMessage,
  generateLocation
};