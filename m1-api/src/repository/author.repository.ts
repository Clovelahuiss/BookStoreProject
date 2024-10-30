import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Author } from '../models/author.entity';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(private dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  async findAuthorsWithCreations(): Promise<Author[]> {
    // On utilise 'creations' au lieu de 'books' et on récupère indirectement les livres via les créations
    return this.find({ relations: ['creations'] });
  }
}
