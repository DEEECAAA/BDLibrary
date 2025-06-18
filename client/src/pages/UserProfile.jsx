import React, { useState } from 'react';
import api from '../services/api';
import '../styles/UserProfile.css';
import '../styles/Background.css';

const UserProfile = ({ user, onLogout }) => {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    password: ''
  });
  const [message, setMessage] = useState('');

  if (!user) return <p>Non sei loggato.</p>;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { username: formData.username };
    if (formData.password.trim()) {
      payload.password = formData.password;
    }

    try {
      const res = await api.put(`/users/${user._id}`, payload);
      localStorage.setItem('user', JSON.stringify(res.data));
      setMessage('Profilo aggiornato con successo');
    } catch (err) {
      setMessage('Errore: ' + (err.response?.data?.error || ''));
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Sei sicuro di voler eliminare il tuo account? L'azione è irreversibile.")) return;
    try {
      await api.delete(`/users/${user._id}`);
      localStorage.removeItem('user');
      if (onLogout) onLogout();
      window.location.href = '/';
    } catch (err) {
      setMessage('Errore durante l\'eliminazione: ' + (err.response?.data?.error || ''));
    }
  };

  return (
    <div className="home-container">
      <div className="user-profile">
        <h2>👤 Profilo Utente</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Nuova Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Lascia vuoto per non modificare"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Salva Modifiche</button>
        </form>

        {message && <p className="message">{message}</p>}

        <div className="info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Registrato il:</strong> {new Date(user.registration_date).toLocaleDateString()}</p>
        </div>

        <button className="delete-btn" onClick={handleDeleteAccount}>
          🗑 Elimina Account
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
