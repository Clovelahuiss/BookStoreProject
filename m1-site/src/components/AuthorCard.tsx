import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Avatar, Box } from '@mui/material';
import Link from 'next/link';
import { Author } from '../models/Author';

interface AuthorCardProps {
    author: Author;
    editMode: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author, editMode, onEdit, onDelete }) => {
    return (
        <Link href={`/authors/${author.id}`} passHref>
            <Card variant="outlined" sx={{ maxWidth: 300, cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                <CardContent>
                    <Box display="flex" justifyContent="center" mb={2}>
                        <Avatar src={author.photo || ''} sx={{ width: 100, height: 100 }} />
                    </Box>
                    <Typography variant="h6" component="div" align="center">
                        {author.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Livres écrits : {author.bookCount || '0'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Note moyenne : {author.averageRating || 'N/A'}
                    </Typography>
                </CardContent>
                {editMode && (
                    <CardActions>
                        <Button variant="outlined" color="primary" onClick={(e) => { e.preventDefault(); onEdit(); }} fullWidth>
                            Modifier
                        </Button>
                        <Button variant="outlined" color="error" onClick={(e) => { e.preventDefault(); onDelete(); }} fullWidth>
                            Supprimer
                        </Button>
                    </CardActions>
                )}
            </Card>
        </Link>
    );
};

export default AuthorCard;
