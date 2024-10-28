// src/app/books/page.tsx
import React from 'react';
import BooksList from '../components/BooksList'; // Chemin corrigé

const BooksPage = () => {
    return (
        <div>
            <h1>Bienvenue dans la bibliothèque</h1>
            <BooksList />
        </div>
    );
};

export default BooksPage;
