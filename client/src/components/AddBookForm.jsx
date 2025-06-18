import React, { useState } from "react";
import api from "../services/api";
import "../styles/AddBookForm.css";

const AddBookForm = ({ onBookAdded }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/books", { title, genre, author });
      onBookAdded();
      setTitle("");
      setGenre("");
      setAuthor("");
      setShowForm(false);
    } catch (err) {
      console.error("Errore durante l'aggiunta del libro:", err);
    }
  };

  return (
    <div className="add-book-container">
      <button
        className="add-book-toggle-btn"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Annulla" : "➕ Aggiungi Libro (Admin)"}
      </button>
      {showForm && (
        <form className="add-book-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Titolo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Genere"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Autore"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <button type="submit">Salva</button>
        </form>
      )}
    </div>
  );
};

export default AddBookForm;