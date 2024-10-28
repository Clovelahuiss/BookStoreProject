// Interface pour un livre
export interface Book {
  id: number;
  title: string;
  publicationDate: string;
  summary?: string;
  price?: number;
  author: Author; // Référence vers l'auteur
  reviews?: Review[]; // Liste des avis associés
}

// Interface pour un auteur
export interface Author {
  id: number;
  name: string;
  bio?: string;
  photo?: string;
  books?: Book[]; // Liste des livres associés
}

// Interface pour un avis
export interface Review {
  id: number;
  rating: number;
  comment?: string;
  bookId: number; // Référence vers l'ID du livre associé
}
