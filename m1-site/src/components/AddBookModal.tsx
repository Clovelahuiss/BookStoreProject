// src/components/AddBookModal.tsx

import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem } from '@mui/material';
import { getAvailableCreations } from '../services/creationService';

interface AddBookModalProps {
    open: boolean;
    onClose: () => void;
    onAddBook: (bookData: { title: string; creationId: number; genre: string; cover: string }) => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ open, onClose, onAddBook }) => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [cover, setCover] = useState('');
    const [creationId, setCreationId] = useState<number | undefined>(undefined);
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
        }
    }, [open]);

    const handleAdd = () => {
        if (creationId !== undefined) {
            onAddBook({ title, genre, cover, creationId });
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
                <Button onClick={onClose} color="secondary">Annuler</Button>
                <Button onClick={handleAdd} color="primary" variant="contained">Valider</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBookModal;
