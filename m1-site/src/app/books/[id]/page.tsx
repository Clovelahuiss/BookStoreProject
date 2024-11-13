// src/pages/books/[id]/index.tsx

'use client';

import '../../../styles/global.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getBookById, updateBook } from '../../../services/bookService';
import { getReviewsByBookId, addReview, deleteReview } from '../../../services/reviewService';
import { Book } from '../../../models/Book';
import { Review } from '../../../models/Review';
import Breadcrumb from '../../../components/Breadcrumb';
import StarRating from '../../../components/StarRating';

const BookDetailPage: React.FC = () => {
    const { id } = useParams() as { id: string | undefined };
    const [book, setBook] = useState<Book | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
    const [editedFields, setEditedFields] = useState({
        title: '',
        publicationDate: '',
        summary: '',
        price: 0,
        coverImageUrl: '',
    });

    useEffect(() => {
        const fetchBook = async () => {
            if (id) {
                try {
                    const bookData = await getBookById(Number(id));
                    setBook(bookData);
                    setEditedFields({
                        title: bookData.title,
                        publicationDate: bookData.publicationDate,
                        summary: bookData.summary || '',
                        price: bookData.price || 0,
                        coverImageUrl: bookData.coverImageUrl || '',
                    });
                } catch (error) {
                    console.error("Erreur lors de la récupération du livre :", error);
                }
            }
        };
        fetchBook();
    }, [id]);

    useEffect(() => {
        const fetchReviews = async () => {
            if (id) {
                try {
                    const reviewsData = await getReviewsByBookId(Number(id));
                    setReviews(reviewsData);
                } catch (error) {
                    console.error("Erreur lors de la récupération des avis :", error);
                }
            }
        };
        fetchReviews();
    }, [id]);

    // Sauvegarder les modifications du livre
    const handleSave = async () => {
        if (!book) return;
        try {
            const updatedBook = await updateBook(book.id, editedFields);
            setBook(updatedBook);
            setIsEditing(false);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du livre :", error);
        }
    };

    // Ajouter un nouvel avis
    const handleAddReview = async () => {
        if (!book) return;
        try {
            const newReviewData = await addReview({ bookId: book.id, ...newReview });
            setReviews((prev) => [...prev, newReviewData]);
            setNewReview({ rating: 0, comment: '' });
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'avis :", error);
        }
    };

    // Supprimer un avis
    const handleDeleteReview = async (reviewId: number) => {
        try {
            await deleteReview(reviewId);
            setReviews((prev) => prev.filter((review) => review.id !== reviewId));
        } catch (error) {
            console.error("Erreur lors de la suppression de l'avis :", error);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {book && (
                <Breadcrumb
                    path={[
                        { name: 'Accueil', href: '/' },
                        { name: 'Livres', href: '/books' },
                        { name: book.title }
                    ]}
                />
            )}
            {book ? (
                <div className="flex flex-col md:flex-row items-start mb-6 space-y-4 md:space-y-0 md:space-x-6">
                    <div className="w-48 h-64 flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
                        <img
                            src={editedFields.coverImageUrl || '/default-cover.jpg'}
                            alt={book.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col space-y-4 full-w-md">
                        {isEditing ? (
                            <>
                                <label>Titre</label>
                                <input
                                    type="text"
                                    value={editedFields.title}
                                    onChange={(e) => setEditedFields({ ...editedFields, title: e.target.value })}
                                    className="p-2 border rounded-lg focus:outline-none"
                                    placeholder="Titre"
                                />
                                <label>Date de publication</label>
                                <input
                                    type="date"
                                    value={editedFields.publicationDate}
                                    onChange={(e) => setEditedFields({ ...editedFields, publicationDate: e.target.value })}
                                    className="p-2 border rounded-lg focus:outline-none"
                                    title="Date de publication"
                                />
                                <label>Résumé</label>
                                <textarea
                                    value={editedFields.summary}
                                    onChange={(e) => setEditedFields({ ...editedFields, summary: e.target.value })}
                                    className="p-2 border rounded-lg focus:outline-none"
                                    placeholder="Résumé"
                                />
                                <label>Prix</label>
                                <input
                                    type="number"
                                    value={editedFields.price}
                                    onChange={(e) => setEditedFields({ ...editedFields, price: parseFloat(e.target.value) })}
                                    className="p-2 border rounded-lg focus:outline-none"
                                    placeholder="Prix"
                                />
                                <label>URL de la couverture</label>
                                <input
                                    type="text"
                                    value={editedFields.coverImageUrl}
                                    onChange={(e) => setEditedFields({ ...editedFields, coverImageUrl: e.target.value })}
                                    className="p-2 border rounded-lg focus:outline-none"
                                    placeholder="URL de la couverture"
                                />
                                <button onClick={handleSave} className="mt-2 p-2 bg-blue-600 text-white rounded-lg">Enregistrer</button>
                            </>
                        ) : (
                            <>
                                <h1 className="text-3xl font-bold text-blue-600">{book.title}</h1>
                                <p>Publié le : {book.publicationDate}</p>
                                <p className="text-gray-700 mt-4">{book.summary}</p>
                                <p className="mt-2 text-gray-500">Prix : {book.price?.toFixed(2) || 'N/A'} €</p>
                                <button onClick={() => setIsEditing(true)} className="p-2 bg-blue-600 text-white rounded-lg mt-4">Modifier</button>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-gray-600">Chargement des informations sur le livre...</p>
            )}

            {/* Section Avis */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold">Avis des utilisateurs</h2>
                <div className="space-y-4 mt-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="border p-4 rounded-lg">
                            <p className="font-bold">
                                Note : 
                                <StarRating rating={review.rating} readonly />
                            </p>
                            {review.comment && <p>Commentaire : {review.comment}</p>}
                            <button
                                onClick={() => handleDeleteReview(review.id)}
                                className="text-red-500 hover:underline mt-2"
                            >
                                Supprimer
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Formulaire pour ajouter un nouvel avis */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold">Ajouter un avis</h3>
                <label className="block mt-2">
                    Note :
                    <StarRating
                        rating={newReview.rating}
                        onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
                    />
                </label>
                <label className="block mt-2">
                    Commentaire :
                    <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        className="p-2 border rounded-lg w-full mt-1"
                        placeholder="Votre commentaire"
                    />
                </label>
                <button
                    onClick={handleAddReview}
                    className="mt-2 p-2 bg-blue-600 text-white rounded-lg"
                >
                    Ajouter l'avis
                </button>
            </div>
        </div>
    );
};

export default BookDetailPage;
