// src/app/components/BooksList.tsx
"use client"; // Chemin corrigé
import React, { useEffect, useState } from 'react';

interface Book {
    id: number;
    title: string;
    publicationDate: string;
    author: {
        id: number;
        name: string;
    };
}


const BooksList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:3001/books'); // Assure-toi que l'URL est correcte
                if (!response.ok) {
                    throw new Error('Failed to load books');
                }
                const data = await response.json();
                setBooks(data);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchBooks();
    }, []);

    if (error) {
        return <div>Failed to load books: {error}</div>;
    }

    return (
        <div>
            <h2>Liste des livres</h2>
            {books.length === 0 ? (
                <div>Aucun livre trouvé.</div>
            ) : (
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            {book.title} (Publié en {book.publicationDate} par {book.author.name})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BooksList;
