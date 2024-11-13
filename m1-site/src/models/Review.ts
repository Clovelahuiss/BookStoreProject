export interface Review {
    id: number;
    rating: number; // Note de 1 à 5
    comment?: string; // Commentaire optionnel
    createdAt: string; // Date de création sous forme de chaîne
    bookId: number; // ID du livre associé
}
