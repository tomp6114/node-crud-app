// models/Book.js
const mongoose = require('mongoose');

// Book Schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  }
});

// Export the model
module.exports = mongoose.model('Book', bookSchema);
