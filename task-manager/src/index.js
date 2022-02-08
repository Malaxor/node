const express = require('express');
const app = express();
const multer = require('multer');
const port = process.env.PORT || 3000;

require('./db/mongoose');

app.use(express.json());

const upload = multer({ dest: 'images' });
app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
})

app.use(require('./routes/users'));
app.use(require('./routes/tasks'));

app.listen(port, () => console.log('listening on port ' + port));
