// src/components/AddBookModal.tsx

import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem } from '@mui/material';
import { getAvailableCreations } from '../services/creationService';

interface AddBookModalProps {
    open: boolean;
    onClose: () => void;
    onAddBook: (book: {
        title: string;
        creationId: number;
        genre: string;
        cover: string;
        publicationDate: string; // Ajout du champ publicationDate
    }) => void;
}

// Imports existants...

const AddBookModal: React.FC<AddBookModalProps> = ({ open, onClose, onAddBook }) => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [cover, setCover] = useState('');
    const [creationId, setCreationId] = useState<number | undefined>(undefined);
    const [publicationDate, setPublicationDate] = useState('');
    const [availableCreations, setAvailableCreations] = useState<{ id: number; nomCreation: string }[]>([]);

    const fetchAvailableCreations = async () => {
        try {
            const creations = await getAvailableCreations();
            setAvailableCreations(creations);
        } catch (error) {
            console.error("Erreur lors de la récupération des créations disponibles :", error);
        }
    };

    useEffect(() => {
        if (open) {
            fetchAvailableCreations();
            setTitle('');
            setGenre('');
            setCover('');
            setCreationId(undefined);
            setPublicationDate('');
        }
    }, [open]);

    const handleAdd = () => {
        if (creationId !== undefined) {
            onAddBook({
                title,
                genre,
                cover,
                creationId,
                publicationDate: publicationDate || new Date().toISOString().split('T')[0]
            });
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Ajouter un Livre</DialogTitle>
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
                    label="Date de publication"
                    type="date"
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                    fullWidth
                    margin="dense"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="URL de la couverture"
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <Select
                    value={creationId}
                    onChange={(e) => setCreationId(e.target.value as number)}
                    fullWidth
                    displayEmpty
                    margin="dense"
                >
                    <MenuItem value="" disabled>Choisir une création</MenuItem>
                    {availableCreations.map((creation) => (
                        <MenuItem key={creation.id} value={creation.id}>
                            {creation.nomCreation}
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button onClick={handleAdd}>Ajouter</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBookModal;