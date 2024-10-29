import axios from 'axios';

export const getCreations = async () => {
  const response = await axios.get('http://localhost:3001/creations');
  return response.data;
};

export const postCreation = async (nomAuteur: string) => {
    const response = await axios.post('http://localhost:3001/creations', { nomAuteur });
    return response.data;
  };
