'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Typography, Avatar, Grid, Card, CardContent, IconButton, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Check } from '@mui/icons-material';
import { Author } from '../../../models/Author';
import { getAuthorById, updateAuthor } from '../../../services/authorService';

interface Book {
    id: number;
    title: string;
    publicationDate: string;
    summary: string;
    price: number;
    averageRating: number | null;
}

interface AuthorWithBooks extends Author {
    books: Book[];
}

const AuthorDetailPage: React.FC = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState<AuthorWithBooks | null>(null);
    const [isEditing, setIsEditing] = useState({
        name: false,
        bio: false,
        photo: false,  // Ajout de la clé photo dans isEditing
    });
    const [editedFields, setEditedFields] = useState({
        name: '',
        bio: '',
        photo: '',
    });
    const [openURLModal, setOpenURLModal] = useState(false);
    const [photoURL, setPhotoURL] = useState('');

    useEffect(() => {
        if (id) {
            const fetchAuthor = async () => {
                try {
                    const authorData = await getAuthorById(Number(id)) as AuthorWithBooks;
                    setAuthor({
                        ...authorData,
                        books: authorData.books || [],
                    });
                    setEditedFields({
                        name: authorData.name,
                        bio: authorData.bio || '',
                        photo: authorData.photo || '',
                    });
                } catch (error) {
                    console.error("Erreur lors de la récupération de l'auteur :", error);
                }
            };
            fetchAuthor();
        }
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

    const handleOpenURLModal = () => setOpenURLModal(true);
    const handleCloseURLModal = () => setOpenURLModal(false);

    const handleSavePhotoURL = async () => {
        if (!author) return;
        
        try {
            await updateAuthor(author.id, { photo: photoURL });
            setAuthor((prev) => prev ? { ...prev, photo: photoURL } : prev);
            setEditedFields((prev) => ({ ...prev, photo: photoURL }));
            handleCloseURLModal();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la photo :", error);
        }
    };

    if (!author) {
        return <Typography>Chargement...</Typography>;
    }

    return (
        <Box p={4} sx={{ maxWidth: 800, mx: 'auto' }}>
            {/* Photo de profil */}
            <Box display="flex" alignItems="center" mb={3} position="relative">
                <Box
                    position="relative"
                    onMouseEnter={() => setIsEditing((prev) => ({ ...prev, photo: true }))}
                    onMouseLeave={() => setIsEditing((prev) => ({ ...prev, photo: false }))}
                    sx={{
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        boxShadow: 3,
                        cursor: 'pointer',
                    }}
                    onClick={handleOpenURLModal} // Ouvre le modal pour entrer une URL
                >
                    <Avatar
                        src={editedFields.photo || author.photo || ''}
                        sx={{
                            width: '100%',
                            height: '100%',
                            border: '4px solid #3f51b5',
                        }}
                    />
                    {isEditing.photo && (
                        <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ 
                                bgcolor: 'rgba(0, 0, 0, 0.5)', 
                                color: 'white',
                            }}
                        >
                            <Edit sx={{ color: 'white', fontSize: 32 }} />
                        </Box>
                    )}
                </Box>
                <Box ml={3}>
                    {isEditing.name ? (
                        <Box display="flex" alignItems="center">
                            <TextField
                                value={editedFields.name}
                                onChange={(e) => setEditedFields((prev) => ({ ...prev, name: e.target.value }))}
                                autoFocus
                                variant="outlined"
                                fullWidth
                                sx={{ fontSize: '2rem', fontWeight: 'bold' }}
                            />
                            <Button onClick={() => handleSave('name')} startIcon={<Check />} sx={{ ml: 1 }}>
                                Sauvegarder
                            </Button>
                        </Box>
                    ) : (
                        <Typography variant="h4" fontWeight="bold" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                            {author.name}
                            <IconButton onClick={() => setIsEditing((prev) => ({ ...prev, name: true }))}>
                                <Edit fontSize="small" />
                            </IconButton>
                        </Typography>
                    )}
                    {isEditing.bio ? (
                        <Box display="flex" alignItems="center" width="100%" mt={2}>
                            <TextField
                                value={editedFields.bio}
                                onChange={(e) => setEditedFields((prev) => ({ ...prev, bio: e.target.value }))}
                                autoFocus
                                fullWidth
                                multiline
                                rows={3}
                                variant="outlined"
                            />
                            <Button onClick={() => handleSave('bio')} startIcon={<Check />} sx={{ ml: 1 }}>
                                Sauvegarder
                            </Button>
                        </Box>
                    ) : (
                        <Typography variant="body1" color="textSecondary" sx={{ mt: 1, fontSize: '1.1rem' }}>
                            {author.bio || "Biographie non disponible"}
                            <IconButton onClick={() => setIsEditing((prev) => ({ ...prev, bio: true }))} sx={{ ml: 1 }}>
                                <Edit fontSize="small" />
                            </IconButton>
                        </Typography>
                    )}
                </Box>
            </Box>

            <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', color: '#3f51b5' }}>
                Livres écrits par {author.name} :
            </Typography>
            <Grid container spacing={3}>
                {author.books.map((book) => (
                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                        <Card variant="outlined" sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
                            <CardContent>
                                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                                    {book.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                    Publié en {book.publicationDate}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    {book.summary}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                    Prix : {book.price} €
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Note moyenne : {book.averageRating || 'N/A'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Modal pour entrer l'URL de la photo */}
            <Dialog open={openURLModal} onClose={handleCloseURLModal}>
                <DialogTitle>Modifier la photo de profil</DialogTitle>
                <DialogContent>
                    <TextField
                        label="URL de la photo"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseURLModal} color="primary">Annuler</Button>
                    <Button onClick={handleSavePhotoURL} color="primary" variant="contained">Sauvegarder</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AuthorDetailPage;
