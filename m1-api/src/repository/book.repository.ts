import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Book } from '../models/book.entity';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(private dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  async findAllBooksWithAuthors(): Promise<Book[]> {
    return this.find({ relations: ['author'] });
  }
}
