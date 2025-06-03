import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import BookList from './components/BookList';
import LoginRegister from './pages/LoginRegister';
import UserProfile from './pages/UserProfile';
import BookPage from './pages/BookPage';

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
      <header style={{ backgroundColor: '#282c34', padding: '1rem', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>📘 Book Reviews</h2>
          <div>
            <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>Home</Link>
            {user ? (
              <>
                <Link to="/profile" style={{ color: 'white', marginRight: '1rem' }}>
                  👤 {user.username}
                </Link>
                <button onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth">
                <button style={{ padding: '0.5rem 1rem' }}>
                  Login / Registrati
                </button>
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