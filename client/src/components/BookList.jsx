import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

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
        fetchBooks(); // aggiorna la lista
      } catch (err) {
        console.error("Errore durante eliminazione libro:", err);
        alert("Errore durante l’eliminazione del libro");
      }
    }
  };

  return (
    <div>
      <h2>Lista dei Libri</h2>
      {books.length === 0 ? (
        <p>Nessun libro trovato.</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book._id} style={{ marginBottom: "1rem" }}>
              <Link to={`/books/${book._id}`}>
                <strong>{book.title}</strong>
              </Link>{" "}
              — {book.genre}
              {user?.isAdmin && (
                <button
                  onClick={() => handleDeleteBook(book._id)}
                  style={{
                    marginLeft: "1rem",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "0.3rem 0.6rem",
                    cursor: "pointer"
                  }}
                >
                  Elimina libro (Admin)
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;