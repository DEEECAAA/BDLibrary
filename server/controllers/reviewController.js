const Review = require('../models/Review');

exports.createReview = async (req, res) => {
  const review = new Review(req.body);
  await review.save();
  res.status(201).json(review);
};

exports.getAllReviews = async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
};

exports.getReviewById = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (review) res.json(review);
  else res.status(404).json({ error: 'Review not found' });
};

exports.updateReview = async (req, res) => {
  const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: 'Review deleted' });
};

exports.getFullReviews = async (req, res) => {
  const result = await Review.aggregate([
    {
      $lookup: {
        from: 'books',
        localField: 'book_id',
        foreignField: '_id',
        as: 'book'
      }
    },
    { $unwind: '$book' },
    {
      $lookup: {
        from: 'users',
        localField: 'user_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' }
  ]);
  res.json(result);
};
