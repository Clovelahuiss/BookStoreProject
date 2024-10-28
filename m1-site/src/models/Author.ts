
export interface Author {
    id: number;
    name: string;
    photo?: string;
    bio?: string;
    bookCount?: number;
    averageRating?: number;
    books?: { id: number; title: string }[];
}
