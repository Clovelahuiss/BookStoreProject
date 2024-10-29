
export interface Author {
    id: number;
    name: string;
    bio?: string;
    photo?: string;
    bookCount?: number;
    averageRating?: number;
    creations?: CreationWithBooks[]; // Ajout de creations comme propriété optionnelle
}


export type NewAuthor = Omit<Author, 'id'>;
