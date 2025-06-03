import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const BookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [editBookData, setEditBookData] = useState({ title: '', author: '', genre: '' });
  const [editingBook, setEditingBook] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [editingReviewId, setEditingReviewId] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const loadReviews = async () => {
    const res = await api.get('/reviews/full/join');
    const filtered = res.data.filter(r => r.book._id === id);
    setReviews(filtered);
  };

  useEffect(() => {
    api.get(`/books/${id}`).then(res => {
      setBook(res.data);
      setEditBookData({ title: res.data.title, author: res.data.author, genre: res.data.genre });
    });
    loadReviews();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        book_id: id,
        user_id: user._id,
        rating: parseInt(newReview.rating),
        comment: newReview.comment?.trim() || '',
        user: user
      };

      if (editingReviewId) {
        await api.put(`/reviews/${editingReviewId}`, body);
      } else {
        await api.post('/reviews', body);
      }

      await loadReviews();
      setNewReview({ rating: 5, comment: '' });
      setEditingReviewId(null);
    } catch (err) {
      console.error("Errore dettagliato:", err.response?.data || err.message);
      alert("Errore durante l'invio della recensione");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Sei sicuro di voler eliminare questa recensione?")) {
      await api.delete(`/reviews/${reviewId}`, { data: { user } });
      await loadReviews();
    }
  };

  const handleDeleteBook = async () => {
    if (window.confirm("Sei sicuro di voler eliminare questo libro?")) {
      await api.delete(`/books/${id}`, { data: { user } });
      navigate('/');
    }
  };

  const handleEdit = (review) => {
    setNewReview({ rating: review.rating, comment: review.comment });
    setEditingReviewId(review._id);
  };

  const handleBookEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/books/${id}`, { ...editBookData, user });
      alert("Libro modificato con successo");
      setEditingBook(false);
      const updated = await api.get(`/books/${id}`);
      setBook(updated.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Errore durante la modifica del libro");
    }
  };

  if (!book) return <p>Caricamento...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{book.title}</h2>
      <p><strong>Genere:</strong> {book.genre}</p>
      <p><strong>Autore:</strong> {book.author}</p>

      {user?.isAdmin && (
        <>
          <button onClick={handleDeleteBook} style={{ backgroundColor: 'red', color: 'white' }}>
            Elimina libro (Admin)
          </button>
          <button onClick={() => setEditingBook(prev => !prev)} style={{ marginLeft: '1rem' }}>
            {editingBook ? 'Annulla Modifica' : 'Modifica libro'}
          </button>

          {editingBook && (
            <form onSubmit={handleBookEditSubmit} style={{ marginTop: '1rem' }}>
              <h4>Modifica Libro</h4>
              <label>Titolo:</label><br />
              <input
                type="text"
                value={editBookData.title}
                onChange={e => setEditBookData(prev => ({ ...prev, title: e.target.value }))}
              /><br />
              <label>Autore:</label><br />
              <input
                type="text"
                value={editBookData.author}
                onChange={e => setEditBookData(prev => ({ ...prev, author: e.target.value }))}
              /><br />
              <label>Genere:</label><br />
              <input
                type="text"
                value={editBookData.genre}
                onChange={e => setEditBookData(prev => ({ ...prev, genre: e.target.value }))}
              /><br />
              <button type="submit" style={{ marginTop: '0.5rem' }}>Salva modifiche</button>
            </form>
          )}
        </>
      )}

      <hr />
      <h3>📝 Recensioni</h3>

      {user && (
        <form onSubmit={handleReviewSubmit} style={{ marginBottom: '2rem' }}>
          <h4>{editingReviewId ? "Modifica la recensione" : "Scrivi una recensione"}</h4>
          <label>Valutazione (1-5): </label>
          <select
            value={newReview.rating}
            onChange={e => setNewReview(prev => ({ ...prev, rating: e.target.value }))}
          >
            {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          <br />
          <textarea
            placeholder="Scrivi qui il tuo commento (opzionale)"
            value={newReview.comment}
            onChange={e => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
            style={{ width: '100%', marginTop: '0.5rem' }}
          />
          <br />
          <button type="submit">{editingReviewId ? "Salva modifiche" : "Invia recensione"}</button>
          {editingReviewId && (
            <button type="button" onClick={() => {
              setEditingReviewId(null);
              setNewReview({ rating: 5, comment: '' });
            }}>Annulla</button>
          )}
        </form>
      )}

      {reviews.length > 0 ? (
        <ul>
          {reviews.map(r => (
            <li key={r._id} style={{ marginBottom: '1rem' }}>
              <strong>{r.user?.username || "Anonimo"}</strong> — {new Date(r.date).toLocaleDateString()}<br />
              ⭐ {r.rating}/5<br />
              <em>{r.comment}</em>
              {user && (r.user._id === user._id || user.isAdmin) && (
                <div>
                  {r.user._id === user._id && (
                    <button onClick={() => handleEdit(r)}>Modifica</button>
                  )}
                  <button onClick={() => handleDeleteReview(r._id)}>Elimina</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nessuna recensione disponibile.</p>
      )}
    </div>
  );
};

export default BookPage;