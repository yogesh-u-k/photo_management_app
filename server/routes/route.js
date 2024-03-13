// routes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Photo = require('../models/Photo');
const app = express()


// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get('/', (req, res)=>{
try{
  res.json("home route")
}
catch(error){
  res.json({error})
}
})
// POST route for uploading photo
router.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.body);
    const imageURL = req.file.path; // Use the path where the uploaded photo is stored
    const photo = new Photo({ title, description, imageURL });
    await photo.save();
    res.sendStatus(200);
    res.send(title)
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.sendStatus(500);
  }
});

module.exports = router;
