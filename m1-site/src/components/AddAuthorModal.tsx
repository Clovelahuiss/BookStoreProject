// src/components/AddAuthorModal.tsx

import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem } from '@mui/material';
import { getAvailableCreations, addCreation } from '../services/creationService';

interface AddAuthorModalProps {
    open: boolean;
    onClose: () => void;
    onAddAuthor: (authorData: { name: string; bio: string; photo: string; creationId?: number; newCreationName?: string }) => void;
}

const AddAuthorModal: React.FC<AddAuthorModalProps> = ({ open, onClose, onAddAuthor }) => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState('');
    const [creationId, setCreationId] = useState<number | 'new' | undefined>(undefined);
    const [newCreationName, setNewCreationName] = useState('');
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
            setName('');
            setBio('');
            setPhoto('');
            setCreationId(undefined);
            setNewCreationName('');
        }
    }, [open]);

    const handleAdd = () => {
        onAddAuthor({ name, bio, photo, creationId: creationId === 'new' ? undefined : creationId, newCreationName });
        fetchAvailableCreations(); // Rafraîchit la liste des créations après ajout d'un auteur
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
                <Select
                    value={creationId}
                    onChange={(e) => setCreationId(e.target.value as number | 'new')}
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
                    <MenuItem value="new">Nouvelle création</MenuItem>
                </Select>

                {creationId === 'new' && (
                    <TextField
                        label="Nom de la nouvelle création"
                        value={newCreationName}
                        onChange={(e) => setNewCreationName(e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Annuler</Button>
                <Button onClick={handleAdd} color="primary" variant="contained">Valider</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAuthorModal;
