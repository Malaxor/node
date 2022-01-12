const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public'), { extensions: ['html']}));


app.get('/weather', (req, res) => {
  res.send({ forecast: 'cloudy', location: 'Detroit' });
});

app.listen(port, () => console.log(`app listening on port ${port}`));