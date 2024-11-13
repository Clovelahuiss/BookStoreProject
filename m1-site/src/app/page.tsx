'use client';
import React, { useEffect, useState } from 'react';
import { Book } from '../models/Book';
import { Author } from '../models/Author';
import { getBooks } from '../services/bookService';
import { getAuthors } from '../services/authorService';
import BookCard from '../components/BookCard';
import Link from 'next/link';

const HomePage: React.FC = () => {
  const [topBooks, setTopBooks] = useState<Book[]>([]);
  const [popularAuthors, setPopularAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const books = await getBooks();
        const authors = await getAuthors();
        setTopBooks(books.slice(0, 4)); // Top 4 livres
        setPopularAuthors(authors.slice(0, 4)); // Top 4 auteurs
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center mb-8">
        <h1 className="text-4xl font-bold">Bienvenue dans la bibliothèque !</h1>
        <p className="text-lg mt-2">Découvrez les livres les mieux notés et explorez nos auteurs populaires.</p>
      </header>

      <div className="flex justify-center gap-4 mb-6">
        <Link href="/books">
          <button className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700">
            Explorer les Livres
          </button>
        </Link>
        <Link href="/authors">
          <button className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700">
            Explorer les Auteurs
          </button>
        </Link>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Livres les mieux notés</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {topBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              editMode={false}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Auteurs populaires</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {popularAuthors.map((author) => (
            <div key={author.id} className="bg-white p-4 rounded-lg shadow-md w-48 text-center">
              <img
                src={author.photo || '/default-author.jpg'}
                alt={author.name}
                className="w-24 h-24 mx-auto rounded-full mb-2 object-cover"
              />
              <h3 className="font-semibold text-lg">{author.name}</h3>
              <p className="text-gray-500">{author.bio?.substring(0, 60)}...</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-gray-600 mt-12">
        <p>&copy; {new Date().getFullYear()} Bibliothèque. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default HomePage;
