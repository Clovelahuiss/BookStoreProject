import React from 'react';

interface DeleteConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirmDelete: () => Promise<void>;
    itemName: string; 
    entityType: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ open, onClose, onConfirmDelete, itemName, entityType }) => {
    if (!open) return null; // Ne pas afficher si le modal n'est pas ouvert

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Supprimer ce {entityType}
                </h2>
                <p className="text-gray-600 mb-6">
                    Êtes-vous sûr de vouloir supprimer {entityType === 'auteur' ? "l'" : 'le'} {entityType} "<span className="font-bold">{itemName}</span>" ? Cette action est irréversible.
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirmDelete}
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
