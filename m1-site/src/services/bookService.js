// src/services/bookService.js
export async function fetchBooks() {
    const response = await fetch('http://localhost:3000/books');
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des livres');
    }
    return response.json();
}
