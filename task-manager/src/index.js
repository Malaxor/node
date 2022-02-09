const express = require('express');
const app = express();
const multer = require('multer');
const port = process.env.PORT || 3000;

require('./db/mongoose');

app.use(express.json());

const upload = multer({ 
  dest: 'images',
  limits: {
    fileSize: 1_000_000 // 1mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(|doc|docx)$/i)) {
      return cb(new Error('Please upload a word document'));
    }
    cb(undefined, true);
  }
});

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
})

app.use(require('./routes/users'));
app.use(require('./routes/tasks'));

app.listen(port, () => console.log('listening on port ' + port));
