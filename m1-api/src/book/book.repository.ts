import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(private dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  // Récupérer tous les livres avec les auteurs associés via la création
  async findAllBooksWithAuthors(): Promise<Book[]> {
    return this.createQueryBuilder('book')
      .leftJoinAndSelect('book.creation', 'creation')
      .leftJoinAndSelect('creation.author', 'author')
      .getMany();
  }

  async findBookById(id: number): Promise<Book | undefined> {
    return this.findOne({
      where: { id },
      relations: ['creation', 'creation.author', 'reviews'],
    });
  }
}
