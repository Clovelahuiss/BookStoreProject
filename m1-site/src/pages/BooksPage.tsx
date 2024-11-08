// src/pages/BooksPage.tsx
'use client';
import React, { useState, useEffect } from 'react';
import AddBookModal from '../components/AddBookModal';
import EditBookModal from '../components/EditBookModal';
import DeleteBookModal from '../components/DeleteBookModal';
import BookCard from '../components/BookCard';
import { Book } from '../models/Book';
import { getBooks, createBook, updateBook, deleteBook } from '../services/bookService';

const BooksPage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchBooks = async () => {
        try {
            const booksList = await getBooks();
            setBooks(booksList);
        } catch (error) {
            console.error("Erreur lors de la récupération des livres :", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        if (!openAddModal && !openEditModal && !openDeleteModal) {
            fetchBooks();
        }
    }, [openAddModal, openEditModal, openDeleteModal]);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenAddModal = () => setOpenAddModal(true);

    const handleAddBook = async (newBook: { 
        title: string; 
        creationId: number;
        publicationDate: string;
        summary?: string;
        price?: number;
    }) => {
        try {
            const addedBook = await createBook({
                ...newBook,
                averageRating: 0,
            });
            setBooks((prev) => [...prev, addedBook]);
            setOpenAddModal(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout du livre :", error);
        }
    };

    const toggleEditMode = () => setEditMode((prev) => !prev);

    const handleEdit = (bookId: number) => {
        const bookToEdit = books.find((book) => book.id === bookId);
        if (bookToEdit) {
            setSelectedBook(bookToEdit);
            setOpenEditModal(true);
        }
    };

    const handleUpdateBook = async (updatedBook: { title: string; genre: string; cover: string }) => {
        if (selectedBook) {
            try {
                const editedBook = await updateBook(selectedBook.id, updatedBook);
                setBooks((prevBooks) =>
                    prevBooks.map((book) =>
                        book.id === selectedBook.id ? editedBook : book
                    )
                );
                setSelectedBook(null);
                setOpenEditModal(false);
            } catch (error) {
                console.error("Erreur lors de la mise à jour du livre :", error);
            }
        }
    };

    const handleDelete = (bookId: number) => {
        const bookToDelete = books.find((book) => book.id === bookId);
        if (bookToDelete) {
            setSelectedBook(bookToDelete);
            setOpenDeleteModal(true);
        }
    };

    const handleConfirmDelete = async () => {
        if (selectedBook) {
            try {
                await deleteBook(selectedBook.id);
                setBooks((prevBooks) =>
                    prevBooks.filter((book) => book.id !== selectedBook.id)
                );
                setSelectedBook(null);
                setOpenDeleteModal(false);
            } catch (error) {
                console.error("Erreur lors de la suppression du livre :", error);
            }
        }
    };

    return (
        <div className="p-6">
            <nav className="text-sm text-gray-500 mb-4">
                <a href="/" className="hover:underline text-blue-600">Accueil</a> {'>'} <span className="text-gray-700">Livres</span>
            </nav>

            <h1 className="text-2xl font-bold mb-6">Liste des Livres</h1>

            <div className="flex gap-4 mb-6">
                <button 
                    className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
                    onClick={handleOpenAddModal}
                >
                    Ajouter un Livre
                </button>
                <button 
                    className={`py-2 px-4 rounded shadow ${editMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-700 border'} hover:bg-gray-700 hover:text-white`}
                    onClick={toggleEditMode}
                >
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

            <AddBookModal 
                open={openAddModal} 
                onClose={() => setOpenAddModal(false)} 
                onAddBook={handleAddBook}
            />
            {selectedBook && (
                <EditBookModal
                    open={openEditModal}
                    onClose={() => setOpenEditModal(false)}
                    onUpdateBook={handleUpdateBook}
                    book={selectedBook}
                />
            )}
            {selectedBook && (
                <DeleteBookModal
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    onConfirmDelete={handleConfirmDelete}
                    bookTitle={selectedBook.title}
                />
            )}
            
            <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredBooks.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                        editMode={editMode}
                        onEdit={() => handleEdit(book.id)}
                        onDelete={() => handleDelete(book.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BooksPage;
