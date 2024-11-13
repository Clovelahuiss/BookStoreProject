'use client';

import '../../../styles/global.css';
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getAuthorById, updateAuthor } from '../../../services/authorService';
import { PencilIcon } from '@heroicons/react/solid';
import PhotoUrlModal from '../../../components/PhotoUrlModal';
import { AuthorWithCreations } from '../../../models/Author';

const Breadcrumb = ({ authorName }: { authorName: string }) => (
    <nav className="text-gray-600 text-sm mb-4">
        <Link href="/" className="text-blue-600 hover:underline">Accueil</Link> {' > '}
        <Link href="/authors" className="text-blue-600 hover:underline">Auteurs</Link> {' > '}
        <span className="text-gray-500">{authorName}</span>
    </nav>
);

const StarRating = ({ averageRating }: { averageRating: number }) => {
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating - fullStars >= 0.5;
    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, index) => <span key={index} className="text-yellow-500">★</span>)}
            {hasHalfStar && <span className="text-yellow-500">½</span>}
            {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => <span key={index} className="text-gray-300">★</span>)}
        </div>
    );
};

const useFetchAuthor = (id: string | null, setAuthor: React.Dispatch<React.SetStateAction<AuthorWithCreations | null>>, setEditedFields: React.Dispatch<React.SetStateAction<{ name: string; bio: string; photo: string }>>, adjustTextareaHeight: () => void) => {
    useEffect(() => {
        const fetchAuthor = async () => {
            if (id) {
                try {
                    const authorData = await getAuthorById(Number(id));
                    setAuthor({ ...(authorData as AuthorWithCreations), creations: authorData.creations || [] });
                    setEditedFields({
                        name: authorData.name,
                        bio: authorData.bio || '',
                        photo: authorData.photo || '',
                    });
                    adjustTextareaHeight();
                } catch (error) {
                    console.error("Erreur lors de la récupération de l'auteur :", error);
                }
            }
        };
        fetchAuthor();
    }, [id, setAuthor, setEditedFields, adjustTextareaHeight]);
};

const useTextareaAutoHeight = (textareaRef: React.RefObject<HTMLTextAreaElement>) => {
    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };
    return adjustTextareaHeight;
};

const getSortedBooks = (author: AuthorWithCreations | null, sortType: string) => {
    if (!author) return [];
    const books = author.creations.flatMap((creation) => creation.books);
    return books.sort((a, b) => {
        const comparisons: Record<string, number> = {
            priceAsc: (a.price || 0) - (b.price || 0),
            priceDesc: (b.price || 0) - (a.price || 0),
            alphaAsc: a.title.localeCompare(b.title),
            alphaDesc: b.title.localeCompare(a.title),
            dateAsc: new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime(),
            dateDesc: new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime(),
            ratingDesc: (b.averageRating || 0) - (a.averageRating || 0),
        };
        return comparisons[sortType] || 0;
    });
};

const AuthorDetailPage: React.FC = () => {
    const { id } = useParams() as { id: string | undefined };
    const [author, setAuthor] = useState<AuthorWithCreations | null>(null);
    const [isEditing, setIsEditing] = useState({ name: false, bio: false });
    const [editedFields, setEditedFields] = useState({ name: '', bio: '', photo: '' });
    const [sortType, setSortType] = useState('');
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const adjustTextareaHeight = useTextareaAutoHeight(textareaRef);

    useFetchAuthor(id || null, setAuthor, setEditedFields, adjustTextareaHeight);

    const handleSave = async (field: 'name' | 'bio' | 'photo') => {
        if (author) {
            try {
                const updatedAuthor = await updateAuthor(author.id, { [field]: editedFields[field] });
                setAuthor((prev) => prev ? { ...prev, ...updatedAuthor } : prev);
                setIsEditing((prev) => ({ ...prev, [field]: false }));
            } catch (error) {
                console.error("Erreur lors de la mise à jour de l'auteur :", error);
            }
        }
    };

    const sortedBooks = getSortedBooks(author, sortType);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {author && <Breadcrumb authorName={author.name} />}
            <div className="flex flex-col md:flex-row items-center mb-6 space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative w-36 h-36 flex-shrink-0 rounded-full overflow-hidden shadow-lg group">
                    <img src={editedFields.photo || author?.photo || ''} alt={author?.name} className="object-cover w-full h-full border-4" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => setIsPhotoModalOpen(true)}>
                        <PencilIcon className="w-8 h-8 text-white" />
                    </div>
                </div>
                <div className="flex flex-col space-y-4 full-w-md">
                    <div className="flex items-center">
                        {isEditing.name ? (
                            <div className="flex items-center">
                                <input
                                    value={editedFields.name}
                                    onChange={(e) => setEditedFields((prev) => ({ ...prev, name: e.target.value }))}
                                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full max-w-xs"
                                    placeholder="Entrez le nom"
                                />
                                <button onClick={() => handleSave('name')} className="ml-2 bg-blue-600 text-white py-1 px-3 rounded-lg">Sauvegarder</button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <h2 className="text-2xl font-bold text-blue-600 truncate max-w-xs">{author?.name}</h2>
                                <PencilIcon onClick={() => setIsEditing((prev) => ({ ...prev, name: true }))} className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800" />
                            </div>
                        )}
                    </div>
                    <div className="flex items-start justify-between w-full">
                        {isEditing.bio ? (
                            <div className="flex flex-col w-full">
                                <textarea
                                    ref={textareaRef}
                                    value={editedFields.bio}
                                    onChange={(e) => { setEditedFields((prev) => ({ ...prev, bio: e.target.value })); adjustTextareaHeight(); }}
                                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full"
                                    placeholder="Entrez la biographie"
                                />
                                <button onClick={() => handleSave('bio')} className="mt-2 bg-blue-600 text-white py-1 px-3 rounded-lg w-full md:w-auto">Sauvegarder</button>
                            </div>
                        ) : (
                            <div className="flex items-center w-full">
                                <p className="text-gray-600 flex-1">{author?.bio || "Biographie non disponible"}</p>
                                <PencilIcon className="w-5 h-5 text-gray-500 cursor-pointer ml-2" onClick={() => setIsEditing({ ...isEditing, bio: true })} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-600">Livres écrits par {author?.name} :</h3>
                <label htmlFor="sortBooks" className="sr-only">Trier les livres</label>
                <select id="sortBooks" value={sortType} onChange={(e) => setSortType(e.target.value)} className="p-2 border border-gray-300 rounded-lg focus:outline-none">
                    <option value="">Aucun tri</option>
                    <option value="priceAsc">Prix croissant</option>
                    <option value="priceDesc">Prix décroissant</option>
                    <option value="alphaAsc">Ordre alphabétique (A-Z)</option>
                    <option value="alphaDesc">Ordre alphabétique (Z-A)</option>
                    <option value="dateAsc">Date de parution croissante</option>
                    <option value="dateDesc">Date de parution décroissante</option>
                    <option value="ratingDesc">Mieux notés</option>
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {sortedBooks.map((book) => (
                    <Link key={book.id} href={`/books/${book.id}`} passHref>
                        <div className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition duration-200 cursor-pointer">
                            <h4 className="font-bold text-lg text-blue-700">{book.title}</h4>
                            <p className="text-sm text-gray-600">Publié en {book.publicationDate}</p>
                            <p className="mt-2 text-gray-700">{book.summary}</p>
                            <p className="mt-2 text-gray-500">Prix : {book.price?.toFixed(2) || 'N/A'} €</p>
                            <div className="flex items-center mt-2">
                                <StarRating averageRating={book.averageRating || 0} />
                                <span className="ml-2 text-gray-500">{book.averageRating?.toFixed(1) || 'N/A'}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {isPhotoModalOpen && (
                <PhotoUrlModal
                    open={isPhotoModalOpen}
                    onClose={() => setIsPhotoModalOpen(false)}
                    onSave={(newPhotoUrl) => { setEditedFields((prev) => ({ ...prev, photo: newPhotoUrl })); handleSave('photo'); }}
                />
            )}
        </div>
    );
};

export default AuthorDetailPage;
