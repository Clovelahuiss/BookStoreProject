// src/BooksList.js
import React, { useEffect, useState } from 'react';
import { fetchBooks } from './services/bookService';

function BooksList() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBooks()
            .then((data) => setBooks(data))
            .catch((error) => setError(error.message));
    }, []);

    if (error) {
        return <p>Erreur : {error}</p>;
    }

    return (
        <div>
            <h1>Liste des Livres</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <h2>{book.title}</h2>
                        <p>Auteur : {book.author}</p>
                        <p>Date de publication : {book.publicationDate}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BooksList;
