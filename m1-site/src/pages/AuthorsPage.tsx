"use client";
import React, { useState, useEffect } from 'react';
import AuthorsList from '../components/AuthorsList';
import { getAuthors, addAuthor } from '../services/authorService';
import { Author, NewAuthor } from '../models/Author';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FormControl, InputLabel, Input } from '@mui/material';

const AuthorsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [authors, setAuthors] = useState<Author[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [newAuthor, setNewAuthor] = useState<NewAuthor>({ name: '', bio: '', photo: '' });

    useEffect(() => {
        const fetchAuthors = async () => {
            const result = await getAuthors();
            setAuthors(result);
        };

        fetchAuthors();
    }, []);

    const filteredAuthors = authors.filter(author =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAuthor((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddAuthor = async () => {
        try {
            const addedAuthor = await addAuthor(newAuthor); // Appel de la fonction addAuthor avec le bon type
            setAuthors((prevAuthors) => [...prevAuthors, addedAuthor]); // Ajouter l'auteur à la liste
            setNewAuthor({ name: '', bio: '', photo: '' }); // Réinitialiser le formulaire
            handleCloseModal(); // Fermer le modal
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'auteur:', error);
        }
    };

    return (
        <Box sx={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Liste des Auteurs
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', mb: 3 }}>
                <TextField
                    variant="outlined"
                    label="Rechercher un auteur"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: '300px' }}
                />
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    Ajouter un auteur
                </Button>
            </Box>
            <AuthorsList authors={filteredAuthors} />

            {/* Modal pour ajouter un nouvel auteur */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="add-author-modal"
                aria-describedby="add-author-form"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '8px',
                }}>
                    <Typography id="add-author-modal" variant="h6" component="h2" sx={{ mb: 2 }}>
                        Ajouter un nouvel auteur
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel htmlFor="name">Nom</InputLabel>
                        <Input id="name" name="name" value={newAuthor.name} onChange={handleInputChange} />
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel htmlFor="bio">Biographie</InputLabel>
                        <Input id="bio" name="bio" value={newAuthor.bio} onChange={handleInputChange} />
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel htmlFor="photo">URL de la photo</InputLabel>
                        <Input id="photo" name="photo" value={newAuthor.photo} onChange={handleInputChange} />
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={handleAddAuthor} sx={{ mt: 2 }}>
                        Ajouter
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default AuthorsPage;
