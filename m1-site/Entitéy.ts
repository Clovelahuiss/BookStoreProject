// Interface pour un auteur
export interface Author {
  id: number;
  name: string;
  bio?: string;
  photo?: string;
  creations?: Creation[]; // Liste des créations associées
  getAverageRating(): number | null; // Fonction pour obtenir la moyenne des notes des livres de l'auteur
}

// Interface pour un livre
export interface Book {
  id: number;
  title: string;
  publicationDate: string;
  summary?: string;
  price?: number;
  averageRating: number; // Note moyenne des avis associés
  creation: Creation; // Référence vers la création associée
  reviews?: Review[]; // Liste des avis associés
}

// Interface pour une création
export interface Creation {
  id: number;
  nomCreation: string;
  author?: Author; // Référence optionnelle vers l'auteur associé
  books?: Book[]; // Liste des livres associés
}

// Interface pour un avis
export interface Review {
  id: number;
  rating: number; // Note de 1 à 5
  comment?: string; // Commentaire optionnel
  createdAt: Date; // Date de création de l'avis
  bookId: number; // Référence vers l'ID du livre associé
}
