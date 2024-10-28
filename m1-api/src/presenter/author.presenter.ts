/* eslint-disable prettier/prettier */
export class AuthorPresenter {
    id: number;
    name: string;
    bio?: string; // Champ optionnel pour la biographie
  
    constructor(partial: Partial<AuthorPresenter>) {
      Object.assign(this, partial);
    }
  }
  