'use client';

import '../../../styles/global.css'; // Importation du fichier global contenant Tailwind

import React, { useEffect, useState, useRef  } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Author } from '../../../models/Author';
import { getAuthorById, updateAuthor } from '../../../services/authorService';
import { PencilIcon } from '@heroicons/react/solid';
import PhotoUrlModal from '../../../components/PhotoUrlModal';
const Breadcrumb = ({ authorName }: { authorName: string }) => (
    <nav className="text-gray-600 text-sm mb-4">
        <Link href="/" className="text-blue-600 hover:underline">
            Accueil
        </Link>
        {' > '}
        <Link href="/authors" className="text-blue-600 hover:underline">
            Auteurs
        </Link>
        {' > '}
        <span className="text-gray-500">{authorName}</span>
    </nav>
);

const StarRating: React.FC<{ averageRating: number }> = ({ averageRating }) => {
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, index) => (
                <span key={`full-${index}`} className="text-yellow-500">★</span>
            ))}
            {hasHalfStar && <span className="text-yellow-500">½</span>}
            {[...Array(emptyStars)].map((_, index) => (
                <span key={`empty-${index}`} className="text-gray-300">★</span>
            ))}
        </div>
    );
};

interface Book {
    id: number;
    title: string;
    publicationDate: string;
    summary: string;
    price: number;
    averageRating: number | null;
}

interface CreationWithBooks {
    id: number;
    nomCreation: string;
    books: Book[];
}

interface AuthorWithCreations extends Author {
    creations: CreationWithBooks[];
}

const AuthorDetailPage: React.FC = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState<AuthorWithCreations | null>(null);
    const [isEditing, setIsEditing] = useState({ name: false, bio: false });
    const [editedFields, setEditedFields] = useState({ name: '', bio: '', photo: '' });
    const [sortType, setSortType] = useState(''); // État pour le type de tri sélectionné
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false); // État pour le modal de photo
    const textareaRef = useRef<HTMLTextAreaElement>(null); // Référence pour la `textarea`

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
                } catch (error) {
                    console.error("Erreur lors de la récupération de l'auteur :", error);
                }
            }
        };
        fetchAuthor();
    }, [id]);

    useEffect(() => {
        adjustTextareaHeight(); // Ajuste la hauteur dès que le texte de la biographie change
    }, [editedFields.bio]);

    const handleSave = async (field: 'name' | 'bio' | 'photo') => {
        if (!author) return;
        try {
            const updatedAuthor = await updateAuthor(author.id, { [field]: editedFields[field] });
            setAuthor((prev) => prev ? { ...prev, ...updatedAuthor } : prev);
            setIsEditing((prev) => ({ ...prev, [field]: false }));
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'auteur :", error);
        }
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortType(event.target.value);
    };

    const getSortedBooks = () => {
        if (!author || !author.creations[0]?.books) return [];
        const books = [...author.creations[0].books];
        switch (sortType) {
            case 'priceAsc': return books.sort((a, b) => (a.price || 0) - (b.price || 0));
            case 'priceDesc': return books.sort((a, b) => (b.price || 0) - (a.price || 0));
            case 'alphaAsc': return books.sort((a, b) => a.title.localeCompare(b.title));
            case 'alphaDesc': return books.sort((a, b) => b.title.localeCompare(a.title));
            case 'dateAsc': return books.sort((a, b) => new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime());
            case 'dateDesc': return books.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());
            case 'ratingDesc': return books.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
            default: return books;
        }
    };

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Réinitialiser la hauteur
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajuster à la hauteur du contenu
        }
    };

    const openPhotoModal = () => {
        setIsPhotoModalOpen(true);
    };

    const closePhotoModal = () => {
        setIsPhotoModalOpen(false);
    };

    const handlePhotoSave = (newPhotoUrl: string) => {
        setEditedFields((prev) => ({ ...prev, photo: newPhotoUrl }));
        handleSave('photo');
        closePhotoModal();
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {author && <Breadcrumb authorName={author.name} />}
    
            <div className="flex flex-col md:flex-row items-center mb-6 space-y-4 md:space-y-0 md:space-x-6">
                {/* Zone photo de l'auteur avec une taille fixe */}
                <div className="relative w-36 h-36 flex-shrink-0 rounded-full overflow-hidden shadow-lg group">
                    <img
                        src={editedFields.photo || author?.photo || ''}
                        alt={author?.name}
                        className="object-cover w-full h-full border-4"
                    />
                    {/* Superposition avec le stylo */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        onClick={openPhotoModal}
                    >
                        <PencilIcon className="w-8 h-8 text-white" />
                    </div>
                </div>

                {/* Zone d'information de l'auteur */}
                <div className="flex flex-col space-y-4 full-w-md">
                    {/* Nom de l'auteur avec un champ d'édition */}
                    <div className="flex items-center">
                        {isEditing.name ? (
                            <div className="flex items-center">
                                <input
                                    value={editedFields.name}
                                    onChange={(e) => setEditedFields((prev) => ({ ...prev, name: e.target.value }))}
                                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full max-w-xs"
                                    placeholder="Entrez le nom"
                                />
                                <button onClick={() => handleSave('name')} className="ml-2 bg-blue-600 text-white py-1 px-3 rounded-lg">
                                    Sauvegarder
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <h2 className="text-2xl font-bold text-blue-600 truncate max-w-xs">{author?.name}</h2>
                                <PencilIcon
                                    onClick={() => setIsEditing((prev) => ({ ...prev, name: true }))}
                                    className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800"
                                />
                            </div>
                        )}
                    </div>
    
                    {/* Biographie de l'auteur */}
                    <div className="flex items-start justify-between w-full">
                            {isEditing.bio ? (
                                <div className="flex flex-col w-full">
                                    <textarea
                                        ref={textareaRef}
                                        value={editedFields.bio}
                                        onChange={(e) => {
                                            setEditedFields((prev) => ({ ...prev, bio: e.target.value }));
                                            adjustTextareaHeight(); // Ajuste dynamiquement la hauteur
                                        }}
                                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full textarea-auto-height"
                                        placeholder="Entrez la biographie"
                                    />
                                    <button onClick={() => handleSave('bio')} className="mt-2 bg-blue-600 text-white py-1 px-3 rounded-lg w-full md:w-auto">
                                        Sauvegarder
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center w-full">
                                    <p className="text-gray-600 flex-1">
                                        {author?.bio || "Biographie non disponible"}
                                    </p>
                                    <PencilIcon
                                        className="w-5 h-5 text-gray-500 cursor-pointer ml-2"
                                        onClick={() => setIsEditing({ ...isEditing, bio: true })}
                                    />
                                </div>
                            )}
                        </div>

                </div>
            </div>
    
            {/* Tri et liste des livres */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-600">Livres écrits par {author?.name} :</h3>
                <label htmlFor="sortBooks" className="sr-only">Trier les livres</label>
                <select id="sortBooks" value={sortType} onChange={handleSortChange} className="p-2 border border-gray-300 rounded-lg focus:outline-none">
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
                {getSortedBooks().map((book) => (
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

            {/* Modal pour l'URL de la photo */}
            {isPhotoModalOpen && (
                <PhotoUrlModal
                    open={isPhotoModalOpen}
                    onClose={closePhotoModal}
                    onSave={handlePhotoSave}
                />
            )}
        </div>
    );
    
    
    
};

export default AuthorDetailPage;
