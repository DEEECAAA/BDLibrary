import React, { useState } from 'react';
import api from '../services/api';

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
    try {
      const res = await api.put(`/users/${user._id}`, formData);
      localStorage.setItem('user', JSON.stringify(res.data));
      setMessage('✅ Profilo aggiornato con successo');
    } catch (err) {
      setMessage('❌ Errore: ' + (err.response?.data?.error || ''));
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("⚠ Sei sicuro di voler eliminare il tuo account? L'azione è irreversibile.")) return;
    try {
      await api.delete(`/users/${user._id}`);
      localStorage.removeItem('user');
      if (onLogout) onLogout();
      window.location.href = '/';
    } catch (err) {
      setMessage('❌ Errore durante l\'eliminazione: ' + (err.response?.data?.error || ''));
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>👤 Profilo Utente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label><br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Nuova Password:</label><br />
          <input
            type="password"
            name="password"
            placeholder="Lascia vuoto per non modificare"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>
          Salva Modifiche
        </button>
      </form>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}

      <p style={{ marginTop: '2rem' }}>
        <strong>Email:</strong> {user.email}<br />
        <strong>Registrato il:</strong> {new Date(user.registration_date).toLocaleDateString()}
      </p>

      <button
        onClick={handleDeleteAccount}
        style={{
          marginTop: '2rem',
          backgroundColor: '#ff4d4d',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          borderRadius: '5px'
        }}
      >
        🗑 Elimina Account
      </button>
    </div>
  );
};

export default UserProfile;