import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface PhotoUrlModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (url: string) => void;
}

const PhotoUrlModal: React.FC<PhotoUrlModalProps> = ({ open, onClose, onSave }) => {
    const [photoUrl, setPhotoUrl] = useState('');

    const handleSave = () => {
        onSave(photoUrl);
        setPhotoUrl('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Entrer l'URL de la photo</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="URL de la photo"
                    type="url"
                    fullWidth
                    variant="outlined"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Annuler
                </Button>
                <Button onClick={handleSave} color="primary" variant="contained">
                    Sauvegarder
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PhotoUrlModal;
