import React from 'react';
import BooksList from './components/BooksList'; // Assure-toi que le chemin est correct

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Bienvenue dans la bibliothèque !</h1>
      <BooksList /> {/* Affiche le composant BooksList ici */}
    </div>
  );
};

export default HomePage;
