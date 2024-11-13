'use client';
import React, { useState, useEffect } from 'react';
import { getAllCreations, deleteCreation } from '../services/creationService';

interface Creation {
  id: number;
  nomCreation: string;
}

const CreationsPage: React.FC = () => {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les créations
  const fetchCreations = async () => {
    setLoading(true);
    try {
      const creationsList = await getAllCreations();
      setCreations(creationsList);
      setError(null);
    } catch (error) {
      setError("Erreur lors de la récupération des créations");
      console.error("Erreur lors de la récupération des créations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreations();
  }, []);

  // Fonction pour supprimer une création
  const handleDelete = async (id: number) => {
    try {
      await deleteCreation(id);
      setCreations((prevCreations) => prevCreations.filter((creation) => creation.id !== id));
    } catch (error) {
      setError("Erreur lors de la suppression de la création");
      console.error(`Erreur lors de la suppression de la création ${id}:`, error);
    }
  };

  if (loading) return <p>Chargement des créations...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gestion des Créations</h1>

      {creations.length === 0 ? (
        <p>Aucune création disponible.</p>
      ) : (
        <ul className="space-y-4">
          {creations.map((creation) => (
            <li
              key={creation.id}
              className="flex justify-between items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <span>{creation.nomCreation}</span>
              <button
                onClick={() => handleDelete(creation.id)}
                className="text-red-600 hover:underline"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CreationsPage;
