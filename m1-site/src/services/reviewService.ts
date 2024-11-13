// src/services/reviewService.ts
import axios from 'axios';
import { Review } from '../models/Review';

const BASE_URL = 'http://localhost:3001/reviews';

// Récupérer tous les avis pour un livre spécifique
export const getReviewsByBookId = async (bookId: number): Promise<Review[]> => {
    const response = await axios.get(`${BASE_URL}?bookId=${bookId}`);
    return response.data;
};

// Ajouter un nouvel avis pour un livre
export const addReview = async (reviewData: { bookId: number; rating: number; comment?: string }): Promise<Review> => {
    const response = await axios.post(BASE_URL, reviewData);
    return response.data;
};

// Supprimer un avis par son ID
export const deleteReview = async (reviewId: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${reviewId}`);
};
