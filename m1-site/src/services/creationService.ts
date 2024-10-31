import axios from 'axios';

interface Creation {
  nomCreation: string;
  id: number;
  nomAuteur: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3001' 
});

export const getCreations = async () => {
  const response = await axios.get('http://localhost:3001/creations');
  return response.data;
};

export const postCreation = async (nomAuteur: string) => {
    const response = await axios.post('http://localhost:3001/creations', { nomAuteur });
    return response.data;
  };

  export const addCreation = async (creationData: { nomCreation: string }) => {
        try {
            const response = await api.post('/creations', creationData); // Envoie nomCreation
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création de la nouvelle création :', error);
            throw error;
        }
    };

  export const getAvailableCreations = async (): Promise<Creation[]> => {
    const response = await axios.get('http://localhost:3001/creations/available');
    return response.data;
  };
