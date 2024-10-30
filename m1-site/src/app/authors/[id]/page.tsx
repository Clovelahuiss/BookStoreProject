'use client';
import '../../../styles/global.css'; // Importation du fichier global contenant Tailwind

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Author } from '../../../models/Author';
import { getAuthorById, updateAuthor } from '../../../services/authorService';

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
    const [isEditing, setIsEditing] = useState({ name: false, bio: false, photo: false });
    const [editedFields, setEditedFields] = useState({ name: '', bio: '', photo: '' });
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [photoUrl, setPhotoUrl] = useState('');
    const [sortType, setSortType] = useState(''); // État pour le type de tri sélectionné

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

    const openPhotoModal = () => setIsPhotoModalOpen(true);
    const closePhotoModal = () => setIsPhotoModalOpen(false);

    const handlePhotoSave = async () => {
        setEditedFields((prev) => ({ ...prev, photo: photoUrl }));
        setAuthor((prev) => prev ? { ...prev, photo: photoUrl } : prev);
        closePhotoModal();
        if (author) {
            try {
                await updateAuthor(author.id, { photo: photoUrl });
            } catch (error) {
                console.error("Erreur lors de la mise à jour de la photo :", error);
            }
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

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {author && <Breadcrumb authorName={author.name} />}
            <div className="flex flex-col md:flex-row items-center mb-6">
                <div 
                    className="relative w-full h-full rounded-full overflow-hidden shadow-lg mx-auto md:mx-0"
                    onMouseEnter={() => setIsEditing((prev) => ({ ...prev, photo: true }))}
                    onMouseLeave={() => setIsEditing((prev) => ({ ...prev, photo: false }))}
                >
                    <img src={editedFields.photo || author?.photo || ''} alt={author?.name} className="w-full h-full object-cover border-4 " />
                    {isEditing.photo && (
                        <button onClick={openPhotoModal} className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
                            Modifier
                        </button>
                    )}
                </div>
                <div className="ml-4 mt-4 md:mt-0">
                    {isEditing.name ? (
                        <div className="flex items-center">
                            <input
                                value={editedFields.name}
                                onChange={(e) => setEditedFields((prev) => ({ ...prev, name: e.target.value }))}
                                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Entrez le nom"
                            />
                            <button onClick={() => handleSave('name')} className="ml-2 bg-blue-600 text-white py-1 px-3 rounded-lg">
                                Sauvegarder
                            </button>
                        </div>
                    ) : (
                        <h2 className="text-2xl font-bold text-blue-600">{author?.name}</h2>
                    )}
                    {isEditing.bio ? (
                        <div className="flex flex-col mt-2">
                            <textarea
                                value={editedFields.bio}
                                onChange={(e) => setEditedFields((prev) => ({ ...prev, bio: e.target.value }))}
                                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Entrez la biographie"
                            />
                            <button onClick={() => handleSave('bio')} className="mt-2 bg-blue-600 text-white py-1 px-3 rounded-lg">
                                Sauvegarder
                            </button>
                        </div>
                    ) : (
                        <p className="mt-2 text-gray-600">{author?.bio || "Biographie non disponible"}</p>
                    )}
                </div>
            </div>

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
        </div>
    );
};

export default AuthorDetailPage;
