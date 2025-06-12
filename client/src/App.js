import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import BookList from './components/BookList';
import LoginRegister from './pages/LoginRegister';
import UserProfile from './pages/UserProfile';
import BookPage from './pages/BookPage';
import './styles/Header.css';

function App() {
  const [user, setUser] = useState(null);

  // Carica l'utente al primo avvio
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <header className="app-header">
        <div className="header-container">
          <h2 className="header-title">📘 Book Reviews</h2>
          <div className="nav-links">
            <Link to="/">Home</Link>
            {user ? (
              <>
                <Link to="/profile">👤 {user.username}</Link>
                <button className="header-button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth">
                <button className="header-button">Login / Registrati</button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/auth" element={<LoginRegister onLogin={handleLogin} />} />
        <Route path="/profile" element={<UserProfile user={user} onLogout={handleLogout} />} />
        <Route path="/books/:id" element={<BookPage user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;