import React from "react";

const bookDetails = {
  1: {
    title: "Libro 1",
    reviews: ["Fantastico!", "Mi è piaciuto molto."],
  },
  2: {
    title: "Libro 2",
    reviews: ["Non male!", "Interessante."],
  },
};

function BookDetails({ bookId }) {
  const book = bookDetails[bookId];

  if (!book) {
    return <p>Libro non trovato.</p>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <h3>Recensioni</h3>
      <ul>
        {book.reviews.map((review, index) => (
          <li key={index}>{review}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookDetails;
