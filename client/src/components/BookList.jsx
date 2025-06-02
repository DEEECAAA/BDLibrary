import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Errore nel recupero dei libri:", err));
  }, []);

  return (
    <div>
      <h2>Lista dei Libri</h2>
      {books.length === 0 ? (
        <p>Nessun libro trovato.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <Link to={`/books/${book._id}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
