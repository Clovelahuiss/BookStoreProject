// src/components/EditAuthorModal.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Author } from '../models/Author';


interface EditAuthorModalProps {

    open: boolean;

    onClose: () => void;

    author: Author;

    onUpdateAuthor: (updatedAuthor: { name: string; bio: string; photo: string }) => Promise<void>;

}


const EditAuthorModal: React.FC<EditAuthorModalProps> = ({ open, onClose, author, onUpdateAuthor }) => {
    const [name, setName] = useState(author.name || '');
    const [bio, setBio] = useState(author.bio || '');
    const [photo, setPhoto] = useState(author.photo || '');

    useEffect(() => {
        setName(author.name);
        setBio(author.bio || '');
        setPhoto(author.photo || '');
    }, [author]);

    const handleSubmit = () => {
        onUpdateAuthor({ name, bio, photo });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Modifier l'auteur</DialogTitle>
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

export default EditAuthorModal;
