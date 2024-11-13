'use client';

import '../../../styles/global.css'; // Importation de Tailwind
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getBookById } from '../../../services/bookService'; // Fonction pour récupérer les détails d'un livre

const Breadcrumb = ({ bookTitle }: { bookTitle: string }) => (
    <nav className="text-gray-600 text-sm mb-4">
        <Link href="/" className="text-blue-600 hover:underline">
            Accueil
        </Link>
        {' > '}
        <Link href="/books" className="text-blue-600 hover:underline">
            Livres
        </Link>
        {' > '}
        <span className="text-gray-500">{bookTitle}</span>
    </nav>
);

interface Book {
    id: number;
    title: string;
    author: string;
    publicationDate: string;
    summary: string;
    price: number;
    averageRating: number | null;
    coverImageUrl?: string;
}

const BookDetailPage: React.FC = () => {
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            if (id) {
                try {
                    const bookData = await getBookById(Number(id));
                    setBook(bookData);
                } catch (error) {
                    console.error("Erreur lors de la récupération du livre :", error);
                }
            }
        };
        fetchBook();
    }, [id]);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {book && <Breadcrumb bookTitle={book.title} />}

            {book ? (
                <div className="flex flex-col md:flex-row items-start mb-6 space-y-4 md:space-y-0 md:space-x-6">
                    {/* Image du livre */}
                    <div className="w-48 h-64 flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
                        <img
                            src={book.coverImageUrl || '/default-cover.jpg'}
                            alt={book.title}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Informations sur le livre */}
                    <div className="flex flex-col space-y-4 full-w-md">
                        <h1 className="text-3xl font-bold text-blue-600">{book.title}</h1>
                        <p className="text-gray-600">Auteur : {book.author}</p>
                        <p className="text-gray-600">Publié le : {book.publicationDate}</p>
                        <p className="text-gray-700 mt-4">{book.summary}</p>
                        <p className="mt-2 text-gray-500">Prix : {book.price?.toFixed(2) || 'N/A'} €</p>
                        
                    </div>
                </div>
            ) : (
                <p className="text-gray-600">Chargement des informations sur le livre...</p>
            )}
        </div>
    );
};

export default BookDetailPage;
