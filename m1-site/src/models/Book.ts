interface Book {
    id: number;
    title: string;
    publicationDate: string;
    summary: string;
    price: number;
    averageRating: number | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CreationWithBooks {
    id: number;
    nomCreation: string;
    books: Book[]; // Liste des livres associés à la création
}