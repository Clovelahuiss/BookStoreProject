/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Author } from '../models/author.entity';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(private dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  async findAuthorsWithBooks(): Promise<Author[]> {
    return this.find({ relations: ['books'] });
  }
}
