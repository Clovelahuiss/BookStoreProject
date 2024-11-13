'use client';
import React, { useState, useEffect } from 'react';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import Card from '../components/Card';
import { Book } from '../models/Book';
import { getBooks, createBook, updateBook, deleteBook } from '../services/bookService';

const BooksPage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [modalType, setModalType] = useState<'add' | 'edit' | 'delete' | null>(null);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [sortCriteria, setSortCriteria] = useState<'note' | 'author' | 'title' | 'price' | 'date'>('note');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // Fetch books on component mount
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksList = await getBooks();
                setBooks(booksList);
            } catch (error) {
                console.error("Erreur lors de la récupération des livres :", error);
            }
        };
        fetchBooks();
    }, [modalType]);

    const handleModalOpen = (type: 'add' | 'edit' | 'delete', book?: Book) => {
        setSelectedBook(book || null);
        setModalType(type);
    };

    const handleModalClose = () => {
        setSelectedBook(null);
        setModalType(null);
    };

    const handleAddBook = async (newBook: { title: string; creationId: number; publicationDate: string; summary?: string; price?: number; coverImageUrl?: string }) => {
        try {
            const addedBook = await createBook(newBook);
            setBooks([...books, addedBook]);
            handleModalClose();
        } catch (error) {
            console.error("Erreur lors de l'ajout du livre :", error);
        }
    };

    const handleUpdateBook = async (updatedBook: Partial<Book>) => {
        if (selectedBook) {
            try {
                const editedBook = await updateBook(selectedBook.id, updatedBook);
                setBooks(books.map((book) => (book.id === selectedBook.id ? editedBook : book)));
                handleModalClose();
            } catch (error) {
                console.error("Erreur lors de la mise à jour du livre :", error);
            }
        }
    };

    const handleConfirmDelete = async () => {
        if (selectedBook) {
            try {
                await deleteBook(selectedBook.id);
                setBooks(books.filter((book) => book.id !== selectedBook.id));
                handleModalClose();
            } catch (error) {
                console.error("Erreur lors de la suppression du livre :", error);
            }
        }
    };

    const sortedBooks = [...books]
        .filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            const criteria = {
                note: (a.averageRating ?? 0) - (b.averageRating ?? 0),
                author: a.creation?.author?.name.localeCompare(b.creation?.author?.name || ''),
                title: a.title.localeCompare(b.title),
                price: (a.price ?? 0) - (b.price ?? 0),
                date: new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime(),
            };
            const result = criteria[sortCriteria];
            return sortOrder === 'asc' ? result : -result;
        });

    return (
        <div className="p-6">
            <nav className="text-sm text-gray-500 mb-4">
                <a href="/" className="hover:underline text-blue-600">Accueil</a> {'>'} <span className="text-gray-700">Livres</span>
            </nav>

            <h1 className="text-2xl font-bold mb-6">Liste des Livres</h1>

            <div className="flex gap-4 mb-6">
                <button className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700" onClick={() => handleModalOpen('add')}>
                    Ajouter un Livre
                </button>
                <button className={`py-2 px-4 rounded shadow ${editMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-700 border'} hover:bg-gray-700 hover:text-white`} onClick={() => setEditMode(!editMode)}>
                    {editMode ? "Terminer" : "Modifier"}
                </button>
                <input
                    type="text"
                    placeholder="Rechercher un livre"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow p-2 border rounded focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="flex gap-4 mb-6">
                <div>
                    <label htmlFor="sortCriteria" className="block text-gray-700">Trier par :</label>
                    <select id="sortCriteria" value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value as 'note' | 'author' | 'title' | 'price' | 'date')} className="p-2 border rounded">
                        <option value="note">Note</option>
                        <option value="author">Auteur</option>
                        <option value="title">Nom</option>
                        <option value="price">Prix</option>
                        <option value="date">Date de publication</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sortOrder" className="block text-gray-700">Ordre :</label>
                    <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')} className="p-2 border rounded">
                        <option value="asc">Croissant</option>
                        <option value="desc">Décroissant</option>
                    </select>
                </div>
            </div>

            {modalType === 'add' && (
                <AddModal open={modalType === 'add'} onClose={handleModalClose} onAddEntity={handleAddBook} entityType='book' />
            )}
            {modalType === 'edit' && selectedBook && (
                <EditModal<Book>
                    open={modalType === 'edit'}
                    onClose={handleModalClose}
                    entityType="book"
                    entity={selectedBook}
                    onUpdateEntity={handleUpdateBook}
                />
            )}
            {modalType === 'delete' && selectedBook && (
                <DeleteConfirmationModal open={modalType === 'delete'} onClose={handleModalClose} onConfirmDelete={handleConfirmDelete} itemName={selectedBook.title} entityType="livre" />
            )}

            <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {sortedBooks.map((book) => (
                    <Card
                        key={book.id}
                        item={book}
                        editMode={editMode}
                        onEdit={() => handleModalOpen('edit', book)}
                        onDelete={() => handleModalOpen('delete', book)}
                        averageRating={book.averageRating}
                        type="book"
                    />                ))}
            </div>
        </div>
    );
};

export default BooksPage;
