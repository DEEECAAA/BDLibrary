import React from "react";
import { Link } from "react-router-dom";

const books = [
  { id: 1, title: "Libro 1" },
  { id: 2, title: "Libro 2" },
];

function BookList() {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <Link to={`/books/${book.id}`}>{book.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default BookList;
