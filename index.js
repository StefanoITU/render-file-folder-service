const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route to upload a file
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});

// Route to list files
app.get('/files', (req, res) => {
  fs.readdir('uploads/', (err, files) => {
    if (err) res.status(500).send('Unable to scan directory');
    res.json(files);
  });
});

// Route to download a file
app.get('/download/:filename', (req, res) => {
  const file = `${__dirname}/uploads/${req.params.filename}`;
  res.download(file);
});

app.listen(port, () => {
  console.log(`File folder service running on port ${port}`);
});
