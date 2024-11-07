import { Book } from './book.entity';

export class BookPresenter {
  id: number;
  title: string;
  publicationDate: string;
  summary?: string;
  author?: { id: number; name: string };

  constructor(book: Book) {
    this.id = book.id;
    this.title = book.title;
    this.publicationDate = book.publicationDate;
    this.summary = book.summary;
    // Vérifie si `author` est défini avant d'accéder à ses propriétés
    this.author = book.creation?.author // Accéder à l’auteur via la relation `creation`
      ? { id: book.creation.author.id, name: book.creation.author.name }
      : null;
  }
}
