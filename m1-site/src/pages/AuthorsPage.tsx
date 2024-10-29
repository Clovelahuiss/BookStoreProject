// src/pages/AuthorsPage.tsx
'use client';
import React, { useState, useEffect } from 'react';
import AddAuthorModal from '../components/AddAuthorModal';
import EditAuthorModal from '../components/EditAuthorModal';
import DeleteAuthorModal from '../components/DeleteAuthorModal';
import { Button, Typography, Box, Grid, TextField } from '@mui/material';
import AuthorCard from '../components/AuthorCard';
import { Author } from '../models/Author';
import { getAuthors, addAuthor, updateAuthor, deleteAuthor } from '../services/authorService';

const AuthorsPage: React.FC = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    const [searchTerm, setSearchTerm] = useState(''); // Ajout du champ de recherche

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

    const filteredAuthors = authors.filter(author => 
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);

    const handleAddAuthor = async (newAuthor: { name: string; bio: string; photo: string }) => {
        try {
            const addedAuthor = await addAuthor(newAuthor);
            setAuthors((prev) => [...prev, addedAuthor]);
            handleCloseAddModal();
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

    const handleUpdateAuthor = async (updatedAuthor: { name: string; bio: string; photo: string }) => {
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
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                Liste des Auteurs
            </Typography>
            <Box display="flex" gap={2} mb={2}>
                <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
                    Ajouter un Auteur
                </Button>
                <Button variant="outlined" color="secondary" onClick={toggleEditMode}>
                    {editMode ? "Terminer" : "Modifier"}
                </Button>
                <TextField
                    label="Rechercher un auteur"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                />
            </Box>
            <AddAuthorModal open={openAddModal} onClose={handleCloseAddModal} onAddAuthor={handleAddAuthor} />
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
            <Grid container spacing={3} mt={2}>
                {filteredAuthors.map((author) => (
                    <Grid item xs={12} sm={6} md={4} key={author.id}>
                        <AuthorCard
                            author={author}
                            editMode={editMode}
                            onEdit={() => handleEdit(author.id)}
                            onDelete={() => handleDelete(author.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AuthorsPage;
