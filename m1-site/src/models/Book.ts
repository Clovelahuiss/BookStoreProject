
export interface Book {
    id: number;
    title: string;
    publicationDate: string;
    summary?: string;
    price?: number;
    averageRating: number | null;
    creation: Creation;
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
