import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginRegister.css';
import '../styles/Background.css';

const LoginRegister = ({ onLogin }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const route = isRegisterMode ? '/auth/register' : '/auth/login';

    try {
      const res = await api.post(route, formData);
      const user = res.data.user || res.data;

      localStorage.setItem('user', JSON.stringify(user));
      onLogin();
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Errore');
    }
  };

  return (
    <div className="login-register">
      <h2>{isRegisterMode ? 'Registrati' : 'Accedi'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
            value={formData.username}
          />
        </div>
        {isRegisterMode && (
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={handleChange}
              value={formData.email}
            />
          </div>
        )}
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <button type="submit">
          {isRegisterMode ? 'Registrati' : 'Accedi'}
        </button>
      </form>
      <p>
        {isRegisterMode ? 'Hai già un account?' : 'Non hai un account?'}{' '}
        <button type="button" onClick={() => setIsRegisterMode(!isRegisterMode)}>
          {isRegisterMode ? 'Accedi' : 'Registrati'}
        </button>
      </p>
    </div>
  );
};

export default LoginRegister;