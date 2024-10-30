import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Avatar, Box } from '@mui/material';
import Link from 'next/link';
import { Author } from '../models/Author';

interface AuthorCardProps {
    author: Author;
    editMode: boolean;
    onEdit: () => void;
    onDelete: () => void;
    averageRating?: number | null; // Ajout de la moyenne des notes en tant que prop
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author, editMode, onEdit, onDelete, averageRating }) => {
    return (
        <Link href={`/authors/${author.id}`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card
                variant="outlined"
                sx={{
                    width: '100%',
                    maxWidth: '100%', // Assure que chaque carte prend toute la place disponible
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 3,
                    },
                    textDecoration: 'none',
                }}
            >

                <CardContent>
                    <Box display="flex" justifyContent="center" mb={2}>
                        <Avatar src={author.photo || ''} sx={{ width: 100, height: 100 }} />
                    </Box>
                    <Typography variant="h6" component="div" align="center" color="textPrimary">
                        {author.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Livres écrits : {author.bookCount || '0'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Note moyenne : {averageRating ? averageRating.toFixed(1) : 'N/A'}
                    </Typography>
                </CardContent>
                {editMode && (
                    <CardActions>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={(e) => { e.preventDefault(); onEdit(); }}
                            fullWidth
                        >
                            Modifier
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={(e) => { e.preventDefault(); onDelete(); }}
                            fullWidth
                        >
                            Supprimer
                        </Button>
                    </CardActions>
                )}
            </Card>
        </Link>
    );
};

export default AuthorCard;
