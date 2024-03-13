// Photo.js

const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageURL: String,
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
