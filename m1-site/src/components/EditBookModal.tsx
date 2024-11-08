// src/components/EditBookModal.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Book } from '../models/Book';

interface EditBookModalProps {
    open: boolean;
    onClose: () => void;
    book: Book;
    onUpdateBook: (updatedBook: Partial<Book>) => Promise<void>;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ book, open, onClose, onUpdateBook }) => {
    const [title, setTitle] = useState(book?.title || '');
    const [publicationDate, setPublicationDate] = useState(book?.publicationDate || '');
    const [summary, setSummary] = useState(book?.summary || '');
    const [price, setPrice] = useState(book?.price?.toString() || '');

    useEffect(() => {
        if (book) {
            setTitle(book.title);
            setPublicationDate(book.publicationDate);
            setSummary(book.summary || '');
            setPrice(book.price?.toString() || '');
        }
    }, [book]);

    const handleSubmit = () => {
        onUpdateBook({
            title,
            publicationDate,
            summary,
            price: price ? parseFloat(price) : undefined
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Modifier le livre</DialogTitle>
            <DialogContent>
                <TextField
                    label="Titre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Date de publication"
                    type="date"
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                    fullWidth
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Résumé"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    margin="dense"
                />
                <TextField
                    label="Prix"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Enregistrer
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditBookModal;