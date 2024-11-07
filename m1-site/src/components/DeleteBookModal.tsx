// src/components/DeleteBookModal.tsx

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface DeleteBookModalProps {
    open: boolean;
    onClose: () => void;
    onConfirmDelete: () => Promise<void>;
    bookTitle: string;
}

const DeleteBookModal: React.FC<DeleteBookModalProps> = ({ open, onClose, onConfirmDelete, bookTitle }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Supprimer ce livre</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Êtes-vous sûr de vouloir supprimer le livre "{bookTitle}" ? Cette action est irréversible.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Annuler
                </Button>
                <Button onClick={onConfirmDelete} color="secondary" variant="contained">
                    Supprimer
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteBookModal;
