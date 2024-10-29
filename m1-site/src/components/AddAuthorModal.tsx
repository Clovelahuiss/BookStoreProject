// src/components/AddAuthorModal.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

interface AddAuthorModalProps {
    open: boolean;
    onClose: () => void;
    onAddAuthor: (author: { name: string; bio: string; photo: string }) => void;
}

const AddAuthorModal: React.FC<AddAuthorModalProps> = ({ open, onClose, onAddAuthor }) => {
    const [newAuthor, setNewAuthor] = React.useState({ name: '', bio: '', photo: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAuthor((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
        onAddAuthor(newAuthor);
        setNewAuthor({ name: '', bio: '', photo: '' });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Ajouter un Auteur</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nom"
                    name="name"
                    fullWidth
                    variant="outlined"
                    value={newAuthor.name}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Biographie"
                    name="bio"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    value={newAuthor.bio}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="URL de la photo"
                    name="photo"
                    fullWidth
                    variant="outlined"
                    value={newAuthor.photo}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
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
