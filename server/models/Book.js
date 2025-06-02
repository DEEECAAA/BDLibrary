const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  _id: String,
  title: { type: String, required: true },
  genre: String,
  author_id: { type: String, required: true }, // riferimento all'autore
  published_year: Number,
  summary: String
});

module.exports = mongoose.model('Book', bookSchema);