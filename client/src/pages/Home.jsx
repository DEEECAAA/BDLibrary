import React from 'react';
import BookList from '../components/BookList';
import AddBookForm from '../components/AddBookForm';

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [refresh, setRefresh] = React.useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Benvenuto nella Libreria Digitale 📚</h1>
      <p>Consulta, gestisci e recensisci tutti i libri che vuoi.</p>
      {user?.isAdmin && <AddBookForm onBookAdded={handleRefresh} />}
      <BookList key={refresh} />
    </div>
  );
};

export default Home;