// src/components/AddBookModal.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem } from '@mui/material';
import { getAllCreations, addCreation } from '../services/creationService';

interface AddBookModalProps {
    open: boolean;
    onClose: () => void;
    onAddBook: (bookData: {
        title: string;
        publicationDate: string;
        summary?: string;
        price?: number;
        coverImageUrl?: string;
        creationId: number;
    }) => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ open, onClose, onAddBook }) => {
    const [title, setTitle] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [summary, setSummary] = useState('');
    const [price, setPrice] = useState<number | undefined>();
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [creationId, setCreationId] = useState<number | 'new' | undefined>(undefined);
    const [newCreationName, setNewCreationName] = useState('');
    const [availableCreations, setAvailableCreations] = useState<{ id: number; nomCreation: string }[]>([]);

    const fetchAvailableCreations = async () => {
        try {
            const creations = await getAllCreations();
            setAvailableCreations(creations);
        } catch (error) {
            console.error("Erreur lors de la récupération des créations :", error);
        }
    };
    

    useEffect(() => {
        if (open) {
            fetchAvailableCreations();
            setTitle('');
            setPublicationDate('');
            setSummary('');
            setPrice(undefined);
            setCoverImageUrl('');
            setCreationId(undefined);
            setNewCreationName('');
        }
    }, [open]);

    const handleAddBook = async () => {
        try {
            let finalCreationId: number | undefined = creationId === 'new' && newCreationName ? 
                (await addCreation({ nomCreation: newCreationName })).id : 
                creationId as number;
            
            // Validation stricte de finalCreationId avant de continuer
            if (typeof finalCreationId === 'number') {
                onAddBook({
                    title,
                    publicationDate,
                    summary,
                    price,
                    coverImageUrl,
                    creationId: finalCreationId,
                });
                onClose();
            } else {
                console.error("Erreur : Aucune création valide n'a été sélectionnée.");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du livre :", error);
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
                    label="Date de publication"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Résumé"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    fullWidth
                    margin="dense"
                    multiline
                    rows={3}
                />
                <TextField
                    label="Prix"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="URL de la couverture"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
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
                <Button onClick={handleAddBook} color="primary" variant="contained">Valider</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBookModal;
