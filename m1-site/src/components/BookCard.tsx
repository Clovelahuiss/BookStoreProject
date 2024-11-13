import React from 'react';
import Link from 'next/link';
import { Book } from '../models/Book';

interface BookCardProps {
    book: Book;
    editMode: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, editMode, onEdit, onDelete }) => {
    const handleClick = (event: React.MouseEvent) => {
        if (editMode) {
            event.preventDefault(); // Empêche la navigation en mode édition
        }
    };

    return (
        <div onClick={handleClick} className="border rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition duration-200">
            {!editMode ? (
                <Link href={`/books/${book.id}`} passHref>
                    <div className="block">
                        <div className="h-48 w-full overflow-hidden rounded-md">
                            <img
                                src={book.coverImageUrl || '/default-cover.jpg'}
                                alt={book.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <h2 className="font-bold mt-2 text-lg">{book.title}</h2>
                    </div>
                </Link>
            ) : (
                <>
                    <div className="h-48 w-full overflow-hidden rounded-md">
                        <img
                            src={book.coverImageUrl || '/default-cover.jpg'}
                            alt={book.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <h2 className="font-bold mt-2 text-lg">{book.title}</h2>
                </>
            )}
            <p className="text-sm text-gray-600">Auteur : {book.creation?.author?.name || "Inconnu"}</p>
            <p className="text-gray-600 mt-1">Prix : {book.price?.toFixed(2) || 'N/A'} €</p>
            <p className="text-gray-600 mt-1">Note moyenne : {book.averageRating?.toFixed(1) || 'N/A'}</p>

            {editMode && (
                <div className="flex justify-between mt-2">
                    <button className="text-blue-600 hover:underline" onClick={(e) => { e.stopPropagation(); onEdit(); }}>Modifier</button>
                    <button className="text-red-600 hover:underline" onClick={(e) => { e.stopPropagation(); onDelete(); }}>Supprimer</button>
                </div>
            )}
        </div>
    );
};

export default BookCard;
