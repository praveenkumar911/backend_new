const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors')



const app = express();
const port = 3000;

app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/imageDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define MongoDB schema
const Schema = mongoose.Schema;
const FileSchema = new Schema({
  fileName: String,
});
const File = mongoose.model('File', FileSchema);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// File upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const fileName = req.file.originalname;
      
      // Save file name to MongoDB
      const newFile = new File({ fileName });
      await newFile.save();
      res.status(200).send('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
