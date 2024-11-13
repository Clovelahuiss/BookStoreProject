import React from 'react';
import Link from 'next/link';
import { Book } from '../models/Book';
import { Author } from '../models/Author';

interface CardProps {
    item: Book | Author;
    editMode: boolean;
    onEdit: () => void;
    onDelete: () => void;
    averageRating?: number | null; // Moyenne des notes pour les auteurs
    type: 'book' | 'author';
}

const Card: React.FC<CardProps> = ({ item, editMode, onEdit, onDelete, averageRating, type }) => {
    const isBook = type === 'book';
    const linkUrl = isBook ? `/books/${item.id}` : `/authors/${item.id}`;
    const itemTitle = isBook ? (item as Book).title : (item as Author).name;
    const imageUrl = isBook ? (item as Book).coverImageUrl : (item as Author).photo;
    const secondaryInfo = isBook ? `Auteur : ${(item as Book).creation?.author?.name || "Inconnu"}` : `Livres écrits : ${(item as Author).bookCount || '0'}`;
    const additionalInfo = isBook ? `Prix : ${(item as Book).price?.toFixed(2) || 'N/A'} €` : `Note moyenne : ${averageRating ? averageRating.toFixed(1) : 'N/A'}`;
    const rating = isBook ? `Note moyenne : ${(item as Book).averageRating?.toFixed(1) || 'N/A'}` : additionalInfo;

    const handleClick = (event: React.MouseEvent) => {
        if (editMode) event.preventDefault(); // Empêche la navigation si en mode édition
    };

    const CardContent = (
        <div onClick={handleClick} className="border rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition duration-200">
            <div className="h-48 w-full overflow-hidden rounded-md flex justify-center items-center bg-gray-100">
                <img
                    src={imageUrl || (isBook ? '/default-cover.jpg' : '/default-avatar.jpg')}
                    alt={itemTitle}
                    className="object-cover w-full h-full"
                />
            </div>
            <h2 className="font-bold mt-2 text-lg text-center">{itemTitle}</h2>
            <p className="text-sm text-gray-600 text-center">{secondaryInfo}</p>
            <p className="text-gray-600 mt-1 text-center">{additionalInfo}</p>
            {isBook && <p className="text-gray-600 mt-1 text-center">{rating}</p>}

            {editMode && (
                <div className="flex justify-between mt-2">
                    <button className="text-blue-600 hover:underline" onClick={(e) => { e.stopPropagation(); onEdit(); }}>Modifier</button>
                    <button className="text-red-600 hover:underline" onClick={(e) => { e.stopPropagation(); onDelete(); }}>Supprimer</button>
                </div>
            )}
        </div>
    );

    return editMode ? (
        <div>{CardContent}</div> // Affiche seulement le contenu sans le lien en mode édition
    ) : (
        <Link href={linkUrl} passHref>
            {CardContent}
        </Link>
    );
};

export default Card;
