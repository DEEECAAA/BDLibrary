const Author = require('../models/Author');

exports.createAuthor = async (req, res) => {
  const author = new Author(req.body);
  await author.save();
  res.status(201).json(author);
};

exports.getAllAuthors = async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
};

exports.getAuthorById = async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) res.json(author);
  else res.status(404).json({ error: 'Author not found' });
};

exports.updateAuthor = async (req, res) => {
  const updated = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteAuthor = async (req, res) => {
  await Author.findByIdAndDelete(req.params.id);
  res.json({ message: 'Author deleted' });
};