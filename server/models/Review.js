const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  book_id: { type: Number, required: true },  // foreign key su Book
  user_id: { type: String, required: true },  // foreign key su User
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);