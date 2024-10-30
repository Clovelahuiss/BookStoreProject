export class AuthorPresenter {
  id: number;
  name: string;
  bio?: string;
  constructor(partial: Partial<AuthorPresenter>) {
    Object.assign(this, partial);
  }
}
