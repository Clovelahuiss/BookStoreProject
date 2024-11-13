import React, { ReactNode } from 'react';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
    return (
        <div
            className={`fixed inset-0 z-50 flex items-end ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } transition-opacity duration-300 ease-in-out`}
        >
            {/* Overlay pour masquer l'arrière-plan */}
            <div
                className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={onClose}
            ></div>

            {/* Contenu du Drawer */}
            <div
                className={`w-full bg-white shadow-xl p-4 rounded-t-2xl h-3/4 overflow-y-auto transform ${
                    isOpen ? 'translate-y-0' : 'translate-y-full'
                } transition-transform duration-300 ease-in-out`}
            >
                <button
                    onClick={onClose}
                    className="text-right text-gray-600 mb-4 p-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
                >
                    Fermer
                </button>            
                {children}
            </div>
        </div>
    );
};

export default Drawer;
