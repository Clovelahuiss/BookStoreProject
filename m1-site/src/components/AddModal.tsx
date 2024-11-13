import React, { useState, useEffect } from 'react';
import { getAvailableCreations, getAllCreations, addCreation } from '../services/creationService';

interface AddModalProps {
    open: boolean;
    onClose: () => void;
    onAddEntity: (entityData: any) => void; // Utilisez un type approprié selon vos besoins
    entityType: 'author' | 'book';
}

const AddModal: React.FC<AddModalProps> = ({ open, onClose, onAddEntity, entityType }) => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState('');
    const [title, setTitle] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [summary, setSummary] = useState('');
    const [price, setPrice] = useState<number | undefined>();
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [creationId, setCreationId] = useState<number | 'new' | undefined>(undefined);
    const [newCreationName, setNewCreationName] = useState('');
    const [availableCreations, setAvailableCreations] = useState<{ id: number; nomCreation: string }[]>([]);

    const fetchCreations = React.useCallback(async () => {
        try {
            const creations = entityType === 'author' ? await getAvailableCreations() : await getAllCreations();
            setAvailableCreations(creations);
        } catch (error) {
            console.error("Erreur lors de la récupération des créations :", error);
        }
    }, [entityType]);

    useEffect(() => {
        if (open) {
            fetchCreations();
            setName('');
            setBio('');
            setPhoto('');
            setTitle('');
            setPublicationDate('');
            setSummary('');
            setPrice(undefined);
            setCoverImageUrl('');
            setCreationId(undefined);
            setNewCreationName('');
        }
    }, [open, fetchCreations]);

    const handleAddEntity = async () => {
        try {
            let finalCreationId: number | undefined = creationId === 'new' && newCreationName
                ? (await addCreation({ nomCreation: newCreationName })).id
                : creationId as number;

            if (typeof finalCreationId === 'number') {
                if (entityType === 'author') {
                    onAddEntity({ name, bio, photo, creationId: finalCreationId });
                } else if (entityType === 'book') {
                    onAddEntity({ title, publicationDate, summary, price, coverImageUrl, creationId: finalCreationId });
                }
                onClose();
            } else {
                console.error("Erreur : Aucune création valide n'a été sélectionnée.");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
        }
    };

    return (
        open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-4">
                    <h2 className="text-xl font-semibold">
                        {entityType === 'author' ? 'Ajouter un Auteur' : 'Ajouter un Livre'}
                    </h2>
                    {entityType === 'author' ? (
                        <>
                            <input
                                type="text"
                                placeholder="Nom"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                            <textarea
                                placeholder="Biographie"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full p-2 border rounded"
                                rows={3}
                            />
                            <input
                                type="text"
                                placeholder="URL de la photo"
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Titre"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="date"
                                title="Date de publication"
                                value={publicationDate}
                                onChange={(e) => setPublicationDate(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                            <textarea
                                placeholder="Résumé"
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                className="w-full p-2 border rounded"
                                rows={3}
                            />
                            <input
                                type="number"
                                placeholder="Prix"
                                title="Prix"
                                value={price ?? ''}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="URL de la couverture"
                                value={coverImageUrl}
                                onChange={(e) => setCoverImageUrl(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </>
                    )}
                    <label htmlFor="creation-select" className="block text-sm font-medium text-gray-700">
                        Choisir une création
                    </label>
                    <select
                        id="creation-select"
                        value={creationId}
                        onChange={(e) => setCreationId(e.target.value as number | 'new')}
                        className="w-full p-2 border rounded"
                    >
                        <option value="" disabled>Choisir une création</option>
                        {availableCreations.map((creation) => (
                            <option key={creation.id} value={creation.id}>
                                {creation.nomCreation}
                            </option>
                        ))}
                        <option value="new">Nouvelle création</option>
                    </select>
                    {creationId === 'new' && (
                        <input
                            type="text"
                            placeholder="Nom de la nouvelle création"
                            value={newCreationName}
                            onChange={(e) => setNewCreationName(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    )}
                    <div className="flex justify-end space-x-2">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                            Annuler
                        </button>
                        <button onClick={handleAddEntity} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Valider
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default AddModal;
