import React from 'react';
import BookList from '../components/BookList';
import AddBookForm from '../components/AddBookForm';
import '../styles/Background.css';

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [refresh, setRefresh] = React.useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="home-container" style={{ padding: '4rem', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Benvenuto nella Libreria Digitale 📚</h1>
      <p style={{ marginBottom: '1.5rem' }}>Consulta, gestisci e recensisci tutti i libri che vuoi.</p>
      {user?.isAdmin && <AddBookForm onBookAdded={handleRefresh} />}
      <BookList key={refresh} />
    </div>
  );
};

export default Home;