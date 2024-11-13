import React, { useState, useEffect } from 'react';

interface EditModalProps<T> {
    open: boolean;
    onClose: () => void;
    entityType: 'author' | 'book';
    entity: T;
    onUpdateEntity: (updatedEntity: Partial<T>) => Promise<void>;
}

function EditModal<T extends { name?: string; bio?: string; photo?: string; title?: string; publicationDate?: string; summary?: string; price?: number }>({
    open,
    onClose,
    entityType,
    entity,
    onUpdateEntity,
}: EditModalProps<T>) {
    const [name, setName] = useState(entity.name || '');
    const [bio, setBio] = useState(entity.bio || '');
    const [photo, setPhoto] = useState(entity.photo || '');
    const [title, setTitle] = useState(entity.title || '');
    const [publicationDate, setPublicationDate] = useState(entity.publicationDate || '');
    const [summary, setSummary] = useState(entity.summary || '');
    const [price, setPrice] = useState(entity.price?.toString() || '');

    useEffect(() => {
        if (entityType === 'author') {
            setName(entity.name || '');
            setBio(entity.bio || '');
            setPhoto(entity.photo || '');
        } else if (entityType === 'book') {
            setTitle(entity.title || '');
            setPublicationDate(entity.publicationDate || '');
            setSummary(entity.summary || '');
            setPrice(entity.price?.toString() || '');
        }
    }, [entity, entityType]);

    const handleSubmit = async () => {
        const updatedEntity =
            entityType === 'author'
                ? { name, bio, photo }
                : { title, publicationDate, summary, price: price ? parseFloat(price) : undefined };

        await onUpdateEntity(updatedEntity as Partial<T>);
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Modifier {entityType === 'author' ? "l'auteur" : 'le livre'}
                </h2>
                {entityType === 'author' && (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Nom</label>
                            <input
                                title="Nom"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Biographie</label>
                            <textarea
                                title="Biographie"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                                rows={4}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">URL de la photo</label>
                            <input
                                title ="URL de la photo"
                                type="text"
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)}
                                className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </>
                )}
                {entityType === 'book' && (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Titre</label>
                            <input
                                title="Titre"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Date de publication</label>
                            <input
                                title="Date de publication"
                                type="date"
                                value={publicationDate}
                                onChange={(e) => setPublicationDate(e.target.value)}
                                className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Résumé</label>
                            <textarea
                                title ="Résumé"
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                                rows={4}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Prix</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Entrez le prix"
                            />
                        </div>
                    </>
                )}
                <div className="flex justify-end space-x-3 mt-4">
                    <button
                        onClick={onClose}
                        className="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
