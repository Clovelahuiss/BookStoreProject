import { Book } from './Book'; 

export interface CreationWithBooks {
    id: number;
    nomCreation: string;
    books: Book[]; 
}

export interface Author {
    id: number;
    name: string;
    bio?: string;
    photo?: string;
    bookCount?: number;
    averageRating?: number;
    creations?: CreationWithBooks[]; 
}

export interface AuthorWithCreations extends Author {
    creations: CreationWithBooks[];
}

export type NewAuthor = Omit<Author, 'id'>;
