// src/components/CreationCard.tsx

import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Avatar, Box } from '@mui/material';
import Link from 'next/link';
import { Creation } from '../models/entité';

interface CreationCardProps {
    creation: Creation;
    editMode: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

const CreationCard: React.FC<CreationCardProps> = ({ creation, editMode, onEdit, onDelete }) => {
    return (
        <Link href={`/creations/${creation.id}`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
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
                        <Avatar src={creation.author?.photo || ''} sx={{ width: 100, height: 100 }} />
                    </Box>
                    <Typography variant="h6" component="div" align="center" color="textPrimary">
                        {creation.nomCreation}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Auteur : {creation.author?.name || 'Inconnu'}
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

export default CreationCard;
