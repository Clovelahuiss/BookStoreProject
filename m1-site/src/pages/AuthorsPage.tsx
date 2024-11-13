'use client';
import React, { useState, useEffect } from 'react';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import Card from '../components/Card';
import { Author } from '../models/Author';
import { getAuthors, addAuthor, updateAuthor, deleteAuthor } from '../services/authorService';

const AuthorsPage: React.FC = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [modalType, setModalType] = useState<'add' | 'edit' | 'delete' | null>(null);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editMode, setEditMode] = useState(false);

    // Fetch authors on component mount
    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const authorsList = await getAuthors();
                setAuthors(authorsList);
            } catch (error) {
                console.error("Erreur lors de la récupération des auteurs :", error);
            }
        };
        fetchAuthors();
    }, [modalType]);

    const handleModalOpen = (type: 'add' | 'edit' | 'delete', author?: Author) => {
        setSelectedAuthor(author || null);
        setModalType(type);
    };

    const handleModalClose = () => {
        setSelectedAuthor(null);
        setModalType(null);
    };

    const handleAddAuthor = async (newAuthorData: Omit<Author, 'id'>) => {
        try {
            const newAuthor = await addAuthor(newAuthorData);
            setAuthors([...authors, newAuthor]);
            handleModalClose();
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'auteur :", error);
        }
    };

    const handleUpdateAuthor = async (updatedAuthorData: Partial<Author>) => {
        if (!selectedAuthor) return;
        try {
            const updatedAuthor = await updateAuthor(selectedAuthor.id, updatedAuthorData);
            setAuthors(authors.map((author) => (author.id === selectedAuthor.id ? updatedAuthor : author)));
            handleModalClose();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'auteur :", error);
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedAuthor) return;
        try {
            await deleteAuthor(selectedAuthor.id);
            setAuthors(authors.filter((author) => author.id !== selectedAuthor.id));
            handleModalClose();
        } catch (error) {
            console.error("Erreur lors de la suppression de l'auteur :", error);
        }
    };

    const filteredAuthors = authors.filter((author) =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <nav className="text-sm text-gray-500 mb-4">
                <a href="/" className="hover:underline text-blue-600">Accueil</a> {'>'} <span className="text-gray-700">Auteurs</span>
            </nav>

            <h1 className="text-2xl font-bold mb-6">Liste des Auteurs</h1>

            <div className="flex gap-4 mb-6">
                <button
                    className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
                    onClick={() => handleModalOpen('add')}
                >
                    Ajouter un Auteur
                </button>
                <button
                    className={`py-2 px-4 rounded shadow ${editMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-700 border'} hover:bg-gray-700 hover:text-white`}
                    onClick={() => setEditMode(!editMode)}
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

            {modalType === 'add' && (
                <AddModal
                    open={modalType === 'add'}
                    onClose={handleModalClose}
                    onAddEntity={handleAddAuthor}
                    entityType="author"
                />
            )}
            {modalType === 'edit' && selectedAuthor && (
                    <EditModal<Author>
                    open={modalType === 'edit'}
                    onClose={handleModalClose}
                    entityType="author"
                    entity={selectedAuthor}
                    onUpdateEntity={handleUpdateAuthor}
                />
                
                )}

            {modalType === 'delete' && selectedAuthor && (
                <DeleteConfirmationModal
                    open={modalType === 'delete'}
                    onClose={handleModalClose}
                    onConfirmDelete={handleConfirmDelete}
                    itemName={selectedAuthor.name}
                    entityType="auteur"
                />
            )}

            <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredAuthors.map((author) => (
                    <Card
                        key={author.id}
                        item={author}
                        editMode={editMode}
                        onEdit={() => handleModalOpen('edit', author)}
                        onDelete={() => handleModalOpen('delete', author)}
                        averageRating={author.averageRating}
                        type="author"
                    />
                ))}
            </div>
        </div>
    );
};

export default AuthorsPage;
