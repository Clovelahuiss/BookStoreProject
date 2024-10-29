// src/components/AddAuthorModal.tsx

import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface AddAuthorModalProps {
    open: boolean;
    onClose: () => void;
    onAddAuthor: (authorData: { name: string; bio: string; photo: string; nomCreation: string }) => void;
}

const AddAuthorModal: React.FC<AddAuthorModalProps> = ({ open, onClose, onAddAuthor }) => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState('');
    const [nomCreation, setNomCreation] = useState(''); // Ajoutez un champ pour le nom de la nouvelle création

    const handleAdd = () => {
        onAddAuthor({ name, bio, photo, nomCreation });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Ajouter un Auteur</DialogTitle>
            <DialogContent>
                <TextField
                    label="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Biographie"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    fullWidth
                    margin="dense"
                    multiline
                    rows={3}
                />
                <TextField
                    label="URL de la photo"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Nom de la nouvelle famille"
                    value={nomCreation}
                    onChange={(e) => setNomCreation(e.target.value)}
                    fullWidth
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Annuler
                </Button>
                <Button onClick={handleAdd} color="primary" variant="contained">
                    Valider
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAuthorModal;
