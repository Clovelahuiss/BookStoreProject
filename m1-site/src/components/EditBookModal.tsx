// src/components/EditBookModal.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Book } from '../models/Book';

interface EditBookModalProps {
    open: boolean;
    onClose: () => void;
    book: Book;
    onUpdateBook: (updatedBook: { title: string; genre: string; cover: string }) => Promise<void>;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ open, onClose, book, onUpdateBook }) => {
    const [title, setTitle] = useState(book.title || '');
    const [genre, setGenre] = useState(book.genre || '');
    const [cover, setCover] = useState(book.cover || '');

    useEffect(() => {
        setTitle(book.title);
        setGenre(book.genre || '');
        setCover(book.cover || '');
    }, [book]);

    const handleSubmit = () => {
        onUpdateBook({ title, genre, cover });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Modifier le Livre</DialogTitle>
            <DialogContent>
                <TextField
                    label="Titre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="URL de la couverture"
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                    fullWidth
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Annuler
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Enregistrer
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditBookModal;
