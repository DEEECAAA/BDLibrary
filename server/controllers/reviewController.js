const Review = require('../models/Review');

// CREATE
exports.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) res.json(review);
    else res.status(404).json({ error: 'Review not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE
exports.updateReview = async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteReview = async (req, res) => {
  const user = req.body.user;
  const reviewId = req.params.id;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Verifica se l'utente è admin o autore della recensione
    if (!user || (!user.isAdmin && user._id !== String(review.user_id))) {
      return res.status(403).json({ error: 'Non sei autorizzato a eliminare questa recensione' });
    }

    await Review.findByIdAndDelete(reviewId);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// JOIN avanzata: Review + Book + User
exports.getFullReviews = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};