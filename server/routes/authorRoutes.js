const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

// CREATE
router.post('/', async (req, res) => {
  const newAuthor = new Author(req.body);
  await newAuthor.save();
  res.status(201).json(newAuthor);
});

// READ ALL
router.get('/', async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
});

// READ ONE
router.get('/:id', async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) res.json(author);
  else res.status(404).json({ error: 'Author not found' });
});

// UPDATE
router.put('/:id', async (req, res) => {
  const updated = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Author.findByIdAndDelete(req.params.id);
  res.json({ message: 'Author deleted' });
});

module.exports = router;