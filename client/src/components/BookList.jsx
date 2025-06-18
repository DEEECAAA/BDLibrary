import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/BookList.css";
import defaultCover from '../assets/copertina.png';


function BookList() {
  const [books, setBooks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");
      setBooks(response.data);
    } catch (err) {
      console.error("Errore nel recupero dei libri:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDeleteBook = async (bookId) => {
    if (window.confirm("Vuoi davvero eliminare questo libro?")) {
      try {
        await api.delete(`/books/${bookId}`, { data: { user } });
        fetchBooks();
      } catch (err) {
        console.error("Errore durante eliminazione libro:", err);
        alert("Errore durante l’eliminazione del libro");
      }
    }
  };

  return (
    <div className="book-list">
      {books.map((book) => (
        <div className="book-card" key={book._id}>
          <Link to={`/books/${book._id}`}>
            <div className="book-image">
              <img
                src={defaultCover}
                alt={book.title}
              />
            </div>
            <h3 className="book-title">{book.title}</h3>
          </Link>

          {user?.isAdmin && (
            <div className="book-actions">
              <button onClick={() => handleDeleteBook(book._id)}>Elimina</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default BookList;