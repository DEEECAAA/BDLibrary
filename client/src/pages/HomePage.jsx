import React from "react";
import BookList from "./components/BookList";

function HomePage() {
  return (
    <div>
      <h1>Lista dei Libri</h1>
      <BookList />
    </div>
  );
}

export default HomePage;
