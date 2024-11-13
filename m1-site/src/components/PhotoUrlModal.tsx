import React, { useState } from 'react';

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

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
                <h2 className="text-xl font-semibold mb-4 text-center">Entrer l'URL de la photo</h2>
                <div className="mb-4">
                    <input
                        type="url"
                        placeholder="URL de la photo"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Sauvegarder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhotoUrlModal;
