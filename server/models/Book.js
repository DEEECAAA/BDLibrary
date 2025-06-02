const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  _id: Number,
  title: { type: String, required: true },
  genre: String,
  author_id: { type: String, required: true }, // riferimento all'autore
});

module.exports = mongoose.model('Book', bookSchema);