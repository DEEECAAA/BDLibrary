import React from "react";
import { useParams } from "react-router-dom";
import BookDetails from "../Components/BookDetails.jsx";

function BookDetailsPage() {
  const { bookId } = useParams();
  return (
    <div>
      <h1>Dettagli Libro</h1>
      <BookDetails bookId={bookId} />
    </div>
  );
}

export default BookDetailsPage;
