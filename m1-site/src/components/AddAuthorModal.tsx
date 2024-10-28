"use client";
import React, { useState } from 'react';
import './Modal.css'; 


interface AddAuthorModalProps {
    onClose: () => void;
    onSave: (name: string, bio: string, photo: string) => void;
}

const AddAuthorModal: React.FC<AddAuthorModalProps> = ({ onClose, onSave }) => {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [photo, setPhoto] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(name, bio, photo);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Ajouter un nouvel auteur</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nom :</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            placeholder="Entrez le nom de l'auteur"
                        />
                    </div>
                    <div>
                        <label>Biographie :</label>
                        <textarea 
                            placeholder="Entrez la biographie de l'auteur"
                            value={bio} 
                            onChange={(e) => setBio(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label>Photo (URL) :</label>
                        <input 
                            type="text" 
                            value={photo} 
                            onChange={(e) => setPhoto(e.target.value)} 
                            title="Photo URL"
                            placeholder="Entrez l'URL de la photo"
                        />
                    </div>
                    <button type="submit">Enregistrer</button>
                    <button type="button" onClick={onClose}>Annuler</button>
                </form>
            </div>
        </div>
    );
};

export default AddAuthorModal;
