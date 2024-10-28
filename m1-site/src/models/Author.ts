
export interface Author {
    id: number;
    name: string;
    bio?: string;
    photo?: string;
    bookCount?: number;
    averageRating?: number;
}

export type NewAuthor = Omit<Author, 'id'>;
