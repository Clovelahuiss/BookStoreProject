"use client";
import React from 'react';
import './BooksList.module.css';

interface Book {
    id: number;
    title: string;
    summary?: string;
    cover?: string;
    publicationDate: string;
    averageRating: number;
    price?: number;
}

interface BookCardProps {
    book: Book;
    onDelete: (bookId: number) => void;
    onEdit: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onDelete, onEdit }) => {
    return (
        <div className="book-card">
            <img src={book.cover || 'default-cover.png'} alt={book.title} className="book-cover" />
            <h3>{book.title}</h3>
            <p>{book.summary || 'Aucun résumé disponible.'}</p>
            <p>Date de publication : {book.publicationDate}</p>
            <p>Prix : {book.price ? `${book.price} €` : 'Non spécifié'}</p>
            <p>Note moyenne : {book.averageRating ? book.averageRating.toFixed(1) : 'N/A'}</p>
            
            <div className="action-buttons">
                <button onClick={() => onEdit(book)}>Modifier</button>
                <button onClick={() => onDelete(book.id)}>Supprimer</button>
            </div>
        </div>
    );
};

interface BookListProps {
    books: Book[];
    onDelete: (bookId: number) => void;
    onEdit: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onDelete, onEdit }) => {
    return (
        <div className="book-list">
            {books.map((book) => (
                <BookCard key={book.id} book={book} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
    );
};

export default BookList;
