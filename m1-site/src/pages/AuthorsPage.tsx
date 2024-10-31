// src/pages/AuthorsPage.tsx
'use client';
import React, { useState, useEffect } from 'react';
import AddAuthorModal from '../components/AddAuthorModal';
import EditAuthorModal from '../components/EditAuthorModal';
import DeleteAuthorModal from '../components/DeleteAuthorModal';
import AuthorCard from '../components/AuthorCard';
import { Author } from '../models/Author';
import { getAuthors, addAuthor, updateAuthor, deleteAuthor } from '../services/authorService';
import { getAvailableCreations } from '../services/creationService';

const AuthorsPage: React.FC = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAuthors = async () => {
        try {
            const authorsList = await getAuthors();
            setAuthors(authorsList);
        } catch (error) {
            console.error("Erreur lors de la récupération des auteurs :", error);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    useEffect(() => {
        if (!openAddModal && !openEditModal && !openDeleteModal) {
            fetchAuthors();
        }
    }, [openAddModal, openEditModal, openDeleteModal]);

    const filteredAuthors = authors.filter(author =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenAddModal = () => {
    setOpenAddModal(true);
};

const handleAddAuthor = async (newAuthor: { name: string; bio: string; photo: string; creationId?: number; newCreationName?: string }) => {
    try {
        const addedAuthor = await addAuthor(newAuthor);
        setAuthors((prev) => [...prev, addedAuthor]);
        setOpenAddModal(false);
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'auteur :", error);
    }
};
    
    
    

    const toggleEditMode = () => setEditMode((prev) => !prev);

    const handleEdit = (authorId: number) => {
        const authorToEdit = authors.find((author) => author.id === authorId);
        if (authorToEdit) {
            setSelectedAuthor(authorToEdit);
            setOpenEditModal(true);
        }
    };

    const handleUpdateAuthor = async (updatedAuthor: { name: string; bio: string; photo: string; nomCreation?: string }) => {
        if (selectedAuthor) {
            try {
                const editedAuthor = await updateAuthor(selectedAuthor.id, updatedAuthor);
                setAuthors((prevAuthors) =>
                    prevAuthors.map((author) =>
                        author.id === selectedAuthor.id ? editedAuthor : author
                    )
                );
                setSelectedAuthor(null);
                setOpenEditModal(false);
            } catch (error) {
                console.error("Erreur lors de la mise à jour de l'auteur :", error);
            }
        }
    };

    const handleDelete = (authorId: number) => {
        const authorToDelete = authors.find((author) => author.id === authorId);
        if (authorToDelete) {
            setSelectedAuthor(authorToDelete);
            setOpenDeleteModal(true);
        }
    };

    const handleConfirmDelete = async () => {
        if (selectedAuthor) {
            try {
                await deleteAuthor(selectedAuthor.id);
                setAuthors((prevAuthors) =>
                    prevAuthors.filter((author) => author.id !== selectedAuthor.id)
                );
                setSelectedAuthor(null);
                setOpenDeleteModal(false);
            } catch (error) {
                console.error("Erreur lors de la suppression de l'auteur :", error);
            }
        }
    };

    return (
        <div className="p-6">
            <nav className="text-sm text-gray-500 mb-4">
                <a href="/" className="hover:underline text-blue-600">Accueil</a> {'>'} <span className="text-gray-700">Auteurs</span>
            </nav>

            <h1 className="text-2xl font-bold mb-6">Liste des Auteurs</h1>

            <div className="flex gap-4 mb-6">
                <button 
                    className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
                    onClick={handleOpenAddModal}
                >
                    Ajouter un Auteur
                </button>
                <button 
                    className={`py-2 px-4 rounded shadow ${editMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-700 border'} hover:bg-gray-700 hover:text-white`}
                    onClick={toggleEditMode}
                >
                    {editMode ? "Terminer" : "Modifier"}
                </button>
                <input
                    type="text"
                    placeholder="Rechercher un auteur"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow p-2 border rounded focus:outline-none focus:border-blue-500"
                />
            </div>

            <AddAuthorModal 
                open={openAddModal} 
                onClose={() => setOpenAddModal(false)} 
                onAddAuthor={handleAddAuthor}
            />
                {selectedAuthor && (
                <EditAuthorModal
                    open={openEditModal}
                    onClose={() => setOpenEditModal(false)}
                    onUpdateAuthor={handleUpdateAuthor}
                    author={selectedAuthor}
                />
            )}
            {selectedAuthor && (
                <DeleteAuthorModal
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    onConfirmDelete={handleConfirmDelete}
                    authorName={selectedAuthor.name}
                />
            )}
            
            <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredAuthors.map((author) => (
                    <AuthorCard
                        key={author.id}
                        author={author}
                        editMode={editMode}
                        onEdit={() => handleEdit(author.id)}
                        onDelete={() => handleDelete(author.id)}
                        averageRating={author.averageRating}
                    />
                ))}
            </div>
        </div>
    );
};

export default AuthorsPage;
