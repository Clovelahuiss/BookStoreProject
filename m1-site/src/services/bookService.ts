// src/services/bookService.ts
import axios from 'axios';
import { Book } from '../models/Book';


const BASE_URL = 'http://localhost:3001/books';


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

export const getBookById = async (id: number): Promise<Book> => {
    try {
        const response = await axios.get<Book>(`${BASE_URL}/${id}`);
        const bookData = response.data;

        // On s'assure que les informations de l'auteur via la création sont bien présentes
        if (bookData.creation && bookData.creation.author) {
            return bookData;
        } else {
            throw new Error("Les informations de l'auteur sont manquantes dans la réponse du serveur");
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération du livre ${id}:`, error);
        throw new Error('Erreur lors de la récupération du livre');
    }
};

export const createBook = async (newBookData: {
    title: string;
    publicationDate: string;
    summary?: string;
    price?: number;
    coverImageUrl?: string;
    creationId: number;
  }): Promise<Book> => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBookData),
    });
  
    if (!response.ok) {
      throw new Error('Erreur lors de la création du livre');
    }
  
    return await response.json();
  };

export const updateBook = async (id: number, updatedBook: Partial<Book>): Promise<Book> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du livre');
    }

    return await response.json();
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