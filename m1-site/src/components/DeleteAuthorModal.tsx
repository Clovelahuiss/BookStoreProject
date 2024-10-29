import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';


interface DeleteAuthorModalProps {

    open: boolean;

    onClose: () => void;

    onConfirmDelete: () => Promise<void>;

    authorName: string;

}


const DeleteAuthorModal: React.FC<DeleteAuthorModalProps> = ({ open, onClose, onConfirmDelete }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Supprimer cet auteur</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Êtes-vous sûr de vouloir supprimer cet auteur ? Cette action est irréversible.
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

export default DeleteAuthorModal;
