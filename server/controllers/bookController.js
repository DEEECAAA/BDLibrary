const Book = require('../models/Book');
const Review = require('../models/Review'); 

// CREATE
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) res.json(book);
    else res.status(404).json({ error: 'Book not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE
exports.updateBook = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    // Elimina il libro
    await Book.findByIdAndDelete(bookId);

    // Elimina tutte le recensioni associate
    await Review.deleteMany({ book_id: bookId });

    res.json({ message: 'Book and related reviews deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};