const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Book = require('./models/Book'); // Assicurati che il path sia corretto

mongoose.connect('mongodb://localhost:27017/libreriaDigitale');

const books = [];

fs.createReadStream('Books_data_raw.csv') // <--- Nome del tuo CSV
  .pipe(csv())
  .on('data', (data) => {
    const { bid, title, author, category } = data;

    books.push({
      _id: parseInt(bid),
      title: title.trim(),
      author_id: author.trim(),
      genre: category.trim(),
    });
  })
  .on('end', async () => {
    try {
      await Book.insertMany(books);
      console.log('✅ Importazione completata con successo!');
    } catch (err) {
      console.error('❌ Errore durante l\'import:', err);
    } finally {
      mongoose.connection.close();
    }
  });
