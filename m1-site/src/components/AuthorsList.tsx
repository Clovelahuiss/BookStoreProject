"use client";
import React from 'react';
import './AuthorsList.module.css';
interface Author {
    id: number;
    name: string;
    bio?: string;
    photo?: string;
    bookCount: number;
    averageRating?: number;
}

interface AuthorCardProps {
    author: Author;
    onDelete: (authorId: number) => void;
    onEdit: (author: Author) => void;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author, onDelete, onEdit }) => {
    return (
        <div className="author-card">
            <img src={author.photo || 'default-photo.png'} alt={author.name} className="author-photo" />
            <h3>{author.name}</h3>
            <p>{author.bio || 'Aucune biographie disponible.'}</p>
            <p>Livres écrits : {author.bookCount}</p>
            <p>Note moyenne : {author.averageRating || 'N/A'}</p>
            
            <div className="action-buttons">
                <button onClick={() => onEdit(author)}>Modifier</button>
                <button onClick={() => onDelete(author.id)}>Supprimer</button>
            </div>
        </div>
    );
};

export default AuthorCard;

