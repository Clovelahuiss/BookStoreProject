// app/authors/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Typography, Avatar, Grid, Card, CardContent } from '@mui/material';
import { Author } from '../../../models/Author';
import { getAuthorById } from '../../../services/authorService';

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

    useEffect(() => {
        if (id) {
            const fetchAuthor = async () => {
                try {
                    const authorData = await getAuthorById(Number(id)) as AuthorWithBooks;
                    setAuthor({
                        ...authorData,
                        books: authorData.books || []
                    });
                } catch (error) {
                    console.error("Erreur lors de la récupération de l'auteur :", error);
                }
            };
            fetchAuthor();
        }
    }, [id]);
    
    
    if (!author) {
        return <Typography>Chargement...</Typography>;
    }

    return (
        <Box p={4}>
            <Box display="flex" alignItems="center" mb={3}>
                <Avatar src={author.photo || ''} sx={{ width: 100, height: 100, mr: 2 }} />
                <Box>
                    <Typography variant="h4">{author.name}</Typography>
                    <Typography variant="body1" color="textSecondary">
                        {author.bio || "Biographie non disponible"}
                    </Typography>
                </Box>
            </Box>

            <Typography variant="h5" gutterBottom>Livres écrits par {author.name} :</Typography>
            <Grid container spacing={2}>
                {author.books.map((book) => (
                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">{book.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Publié en {book.publicationDate}
                                </Typography>
                                <Typography variant="body2">
                                    Résumé : {book.summary}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
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
        </Box>
    );
};

export default AuthorDetailPage;
