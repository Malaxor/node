const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const User = require('./models/User');

require('./db/mongoose');
app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user.save()
  .then(user => res.send(user))
  .catch(err => res.status(400).send(err));
});

app.listen(port, () => console.log('listening on port ' + port));