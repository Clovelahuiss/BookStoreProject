// src/services/bookService.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/books';

export interface Book {
    id: number;
    title: string;
    summary?: string;
    cover?: string;
    publicationDate: string;
    averageRating: number;
    price?: number;
    creationId?: number;
}

// Récupérer tous les livres
export const getBooks = async (search?: string): Promise<Book[]> => {
    try {
        const url = search ? `${BASE_URL}?search=${search}` : BASE_URL;
        const response = await axios.get<Book[]>(url);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des livres:', error);
        throw new Error('Erreur lors de la récupération des livres');
    }
};

// Récupérer un livre par son ID
export const getBookById = async (id: number): Promise<Book> => {
    try {
        const response = await axios.get<Book>(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération du livre ${id}:`, error);
        throw new Error('Erreur lors de la récupération du livre');
    }
};

// Créer un nouveau livre
export const createBook = async (bookData: Omit<Book, 'id'>): Promise<Book> => {
    try {
        const response = await axios.post<Book>(BASE_URL, bookData);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création du livre:', error);
        throw new Error('Erreur lors de la création du livre');
    }
};

// Mettre à jour un livre
export const updateBook = async (id: number, bookData: Partial<Book>): Promise<Book> => {
    try {
        const response = await axios.put<Book>(`${BASE_URL}/${id}`, bookData);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du livre ${id}:`, error);
        throw new Error('Erreur lors de la mise à jour du livre');
    }
};

// Supprimer un livre
export const deleteBook = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        console.error(`Erreur lors de la suppression du livre ${id}:`, error);
        throw new Error('Erreur lors de la suppression du livre');
    }
};