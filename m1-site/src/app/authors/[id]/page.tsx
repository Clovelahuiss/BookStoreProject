'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Grid, Card, CardContent, IconButton, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Check } from '@mui/icons-material';
import { useParams } from 'next/navigation';
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
    const [isEditing, setIsEditing] = useState({
        name: false,
        bio: false,
        photo: false,
    });
    const [editedFields, setEditedFields] = useState({
        name: '',
        bio: '',
        photo: '',
    });
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [photoUrl, setPhotoUrl] = useState('');

    useEffect(() => {
        const fetchAuthor = async () => {
            if (id) {
                try {
                    const authorData = await getAuthorById(Number(id));
                    setAuthor({
                        ...(authorData as AuthorWithCreations),
                        creations: authorData.creations || [],
                    });
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
                console.log("Photo mise à jour avec succès dans la base de données");
            } catch (error) {
                console.error("Erreur lors de la mise à jour de la photo :", error);
            }
        }
    };

    return (
        <Box p={4} sx={{ maxWidth: '900px', mx: 'auto' }}>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={4}>
                {/* Photo de profil avec survol pour modification */}
                <Box 
                    sx={{
                        position: 'relative',
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        boxShadow: 3,
                        flexShrink: 0,
                        mx: 'auto',
                    }}
                    onMouseEnter={() => setIsEditing((prev) => ({ ...prev, photo: true }))}
                    onMouseLeave={() => setIsEditing((prev) => ({ ...prev, photo: false }))}
                >
                    <Avatar
                        src={editedFields.photo || author?.photo || ''}
                        alt={author?.name}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
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
                                cursor: 'pointer',
                            }}
                            onClick={openPhotoModal}
                        >
                            <Edit sx={{ color: 'white', fontSize: 32 }} />
                        </Box>
                    )}
                </Box>

                <Box ml={{ md: 3 }} mt={{ xs: 2, md: 0 }} flexGrow={1}>
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
                            {author?.name}
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
                            {author?.bio || "Biographie non disponible"}
                            <IconButton onClick={() => setIsEditing((prev) => ({ ...prev, bio: true }))} sx={{ ml: 1 }}>
                                <Edit fontSize="small" />
                            </IconButton>
                        </Typography>
                    )}
                </Box>
            </Box>

            <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', color: '#3f51b5' }}>
                Livres écrits par {author?.name} :
            </Typography>
            <Grid container spacing={3}>
                {author?.creations[0]?.books && author.creations[0].books.length > 0 ? (
                    author.creations[0].books.map((book) => (
                        <Grid item xs={12} sm={6} md={4} key={book.id}>
                            <Card variant="outlined" sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
                                <CardContent>
                                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                                        {book.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Publié en {book.publicationDate}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {book.summary}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                        Prix : {book.price?.toFixed(2) || 'N/A'} €
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Note moyenne : {book.averageRating || 'N/A'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                        Aucun livre disponible pour cette création.
                    </Typography>
                )}
            </Grid>

            {/* Modal pour l'URL de la photo */}
            <Dialog open={isPhotoModalOpen} onClose={closePhotoModal}>
                <DialogTitle>Modifier l'URL de la photo</DialogTitle>
                <DialogContent>
                    <TextField
                        label="URL de la photo"
                        type="url"
                        fullWidth
                        variant="outlined"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closePhotoModal} color="secondary">
                        Annuler
                    </Button>
                    <Button onClick={handlePhotoSave} color="primary">
                        Sauvegarder
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AuthorDetailPage;
