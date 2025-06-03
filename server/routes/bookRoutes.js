const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const isAdmin = require('../middleware/isAdmin');

// CRUD
router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.put('/:id', bookController.updateBook);
router.delete('/:id', isAdmin, bookController.deleteBook);

module.exports = router;