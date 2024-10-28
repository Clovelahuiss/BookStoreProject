import { Book } from '../models/book.entity';

export class BookPresenter {
  id: number;
  title: string;
  publicationDate: string;
  summary?: string;
  author?: { id: number; name: string }; // Rendre `author` optionnel

  constructor(book: Book) {
    this.id = book.id;
    this.title = book.title;
    this.publicationDate = book.publicationDate;
    this.summary = book.summary;
    // Vérifie si `author` est défini avant d'accéder à ses propriétés
    this.author = book.author
      ? { id: book.author.id, name: book.author.name }
      : undefined;
  }
}
