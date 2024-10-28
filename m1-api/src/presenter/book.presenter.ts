/* eslint-disable prettier/prettier */
export class BookPresenter {
    id: number;
    title: string;
    publicationDate: string;
    author: string;
  
    // Constructeur pour mapper les propriétés depuis l'entité Book
    constructor(partial: Partial<BookPresenter>) {
      Object.assign(this, partial);
    }
  }
  