import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { getCreations, postCreation } from '../services/creationService';

interface AddAuthorModalProps {
  open: boolean;
  onClose: () => void;
  onAddAuthor: (authorData: { name: string; bio: string; photo: string; famille: string }) => void;
}

const AddAuthorModal: React.FC<AddAuthorModalProps> = ({ open, onClose, onAddAuthor }) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('');
  const [famille, setFamille] = useState('');
  const [creations, setCreations] = useState<{ id: number; nomAuteur: string }[]>([]);
  const [newFamille, setNewFamille] = useState(''); // Champ pour une nouvelle création

  useEffect(() => {
    const fetchCreations = async () => {
      try {
        const fetchedCreations = await getCreations();
        setCreations(fetchedCreations);
      } catch (error) {
        console.error("Erreur lors de la récupération des créations :", error);
      }
    };
    fetchCreations();
  }, []);

  const handleSubmit = async () => {
    let selectedFamille = famille;

    if (famille === 'new' && newFamille) {
      // Si "Nouvelle famille" est sélectionné, crée une nouvelle création
      try {
        const newCreation = await postCreation(newFamille);
        selectedFamille = newCreation.nomAuteur; // Met à jour la famille avec la nouvelle création
      } catch (error) {
        console.error("Erreur lors de la création de la nouvelle famille :", error);
        return;
      }
    }

    onAddAuthor({ name, bio, photo, famille: selectedFamille });
    onClose();
    setName('');
    setBio('');
    setPhoto('');
    setFamille('');
    setNewFamille('');
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, width: 400, mx: 'auto', mt: '20vh' }}>
        <Typography variant="h6" gutterBottom>Ajouter un Auteur</Typography>
        
        <TextField label="Nom" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Biographie" fullWidth margin="normal" value={bio} onChange={(e) => setBio(e.target.value)} />
        <TextField label="URL de la photo" fullWidth margin="normal" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Famille</InputLabel>
          <Select value={famille} onChange={(e) => setFamille(e.target.value)}>
            {creations.map((creation) => (
              <MenuItem key={creation.id} value={creation.nomAuteur}>{creation.nomAuteur}</MenuItem>
            ))}
            <MenuItem value="new">Nouvelle famille</MenuItem>
          </Select>
        </FormControl>
        
        {famille === 'new' && (
          <TextField
            label="Nom de la nouvelle famille"
            fullWidth
            margin="normal"
            value={newFamille}
            onChange={(e) => setNewFamille(e.target.value)}
          />
        )}
        
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ mt: 2 }}>
          Valider
        </Button>
      </Box>
    </Modal>
  );
};

export default AddAuthorModal;
