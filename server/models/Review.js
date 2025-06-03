const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, // foreign key su Book
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // foreign key su User
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);