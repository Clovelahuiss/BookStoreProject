
export interface Book {
    id: number;
    title: string;
    publicationDate: string;
    summary?: string;
    price?: number;
    averageRating: number | null;
    creation: Creation; // Mise à jour pour inclure l'auteur via la création
    coverImageUrl?: string;
}


export interface Author {
    id: number;
    name: string;
}

export interface Creation {
    id: number;
    author: Author;
    nomCreation: string;
}
