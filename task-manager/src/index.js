const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('./db/mongoose');
app.use(express.json());

app.use(require('./routes/users'));
app.use(require('./routes/tasks'));

app.listen(port, () => console.log('listening on port ' + port));

const jwt = require('jsonwebtoken');

const myFunction = async () => {

}

myFunction()