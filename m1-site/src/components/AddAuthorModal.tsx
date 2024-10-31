import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
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
    const [creationId, setCreationId] = useState<number | 'new' | ''>('');
    const [availableCreations, setAvailableCreations] = useState<{ id: number; nomCreation: string }[]>([]);
    const [newCreationName, setNewCreationName] = useState('');

    useEffect(() => {
        const fetchAvailableCreations = async () => {
            try {
                const creations = await getAvailableCreations();
                setAvailableCreations(creations);
            } catch (error) {
                console.error("Erreur lors de la récupération des créations disponibles :", error);
            }
        };

        fetchAvailableCreations();
    }, []);

    const handleAdd = async () => {
        let finalCreationId = creationId as number | undefined;

        // Si "Nouvelle famille" est sélectionnée, créez une nouvelle création
        if (creationId === 'new' && newCreationName) {
            try {
                const newCreation = await addCreation({ nomCreation: newCreationName });
                finalCreationId = newCreation.id; // Utilisez l'ID de la nouvelle création
            } catch (error) {
                console.error("Erreur lors de la création de la nouvelle famille :", error);
                return; // Arrêtez si la création échoue
            }
        }

        // Envoie les données pour créer l'auteur, en utilisant l'ID de la création existante ou nouvelle
        onAddAuthor({
            name,
            bio,
            photo,
            creationId: finalCreationId,
        });
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

                <FormControl fullWidth margin="dense">
                    <InputLabel>Famille</InputLabel>
                    <Select
                        value={creationId}
                        onChange={(e) => setCreationId(e.target.value as number | 'new')}
                        label="Famille"
                    >
                        {availableCreations.map((creation) => (
                            <MenuItem key={creation.id} value={creation.id}>
                                {creation.nomCreation}
                            </MenuItem>
                        ))}
                        <MenuItem value="new">Nouvelle famille</MenuItem>
                    </Select>
                </FormControl>

                {creationId === 'new' && (
                    <TextField
                        label="Nom de la nouvelle famille"
                        value={newCreationName}
                        onChange={(e) => setNewCreationName(e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                )}
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
