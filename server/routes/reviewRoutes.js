const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// CREATE
router.post('/', async (req, res) => {
  const review = new Review(req.body);
  await review.save();
  res.status(201).json(review);
});

// READ ALL
router.get('/', async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

// READ ONE
router.get('/:id', async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (review) res.json(review);
  else res.status(404).json({ error: 'Review not found' });
});

// UPDATE
router.put('/:id', async (req, res) => {
  const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: 'Review deleted' });
});

// JOIN avanzata (Book + User info)
router.get('/full', async (req, res) => {
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
});

module.exports = router;