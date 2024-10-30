interface Book {
    id: number;
    title: string;
    publicationDate: string;
    summary: string;
    price: number;
    averageRating: number | null;
}

interface CreationWithBooks {
    id: number;
    nomCreation: string;
    books: Book[]; // Liste des livres associés à la création
}

// Example usage of CreationWithBooks
const exampleCreation: CreationWithBooks = {
    id: 1,
    nomCreation: "Example Creation",
    books: [
        {
            id: 1,
            title: "Example Book",
            publicationDate: "2023-01-01",
            summary: "This is an example book.",
            price: 19.99,
            averageRating: 4.5
        }
    ]
};

// Log the example creation to the console
console.log(exampleCreation);
