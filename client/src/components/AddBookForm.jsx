import React, { useState } from "react";
import api from "../services/api";

const AddBookForm = ({ onBookAdded }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/books", { title, genre, author });
      onBookAdded(); // aggiorna la lista
      setTitle("");
      setGenre("");
      setAuthor("");
      setShowForm(false);
    } catch (err) {
      console.error("Errore durante l'aggiunta del libro:", err);
    }
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: "1rem" }}>
        {showForm ? "Annulla" : "➕ Aggiungi Libro"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
          <input
            type="text"
            placeholder="Titolo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ marginRight: "1rem" }}
          />
          <input
            type="text"
            placeholder="Genere"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            style={{ marginRight: "1rem" }}
          />
          <input
            type="text"
            placeholder="Autore"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={{ marginRight: "1rem" }}
          />
          <button type="submit">Salva</button>
        </form>
      )}
    </div>
  );
};

export default AddBookForm;