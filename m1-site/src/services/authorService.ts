
import { Author, NewAuthor } from '../models/Author';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/authors';

export const getAuthors = async (search?: string): Promise<Author[]> => {
    const url = search ? `${BASE_URL}?search=${search}` : BASE_URL;
    const response = await fetch(url);
    return await response.json();
};

export const getAuthorById = async (id: number): Promise<Author> => {
    const response = await fetch(`${BASE_URL}/${id}`);
    return await response.json();
};


// Fonction pour ajouter un nouvel auteur
export const addAuthor = async (author: NewAuthor): Promise<Author> => {
    const response = await axios.post(BASE_URL, author);
    return response.data;
};

export const createAuthor = async (author: Author): Promise<Author> => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(author),
    });
    return await response.json();
};