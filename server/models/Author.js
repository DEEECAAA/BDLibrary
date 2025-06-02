const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birth_year: Number,
  nationality: String,
  biography: String
});

module.exports = mongoose.model('Author', authorSchema);