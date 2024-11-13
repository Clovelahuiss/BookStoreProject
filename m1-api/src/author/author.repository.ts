import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Author } from './author.entity';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(private dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  async findAuthorsWithDetails(): Promise<Author[]> {
    return this.createQueryBuilder('author')
      .leftJoinAndSelect('author.creations', 'creation')
      .leftJoinAndSelect('creation.books', 'book')
      .getMany();
  }

  async findOneWithDetails(id: number): Promise<Author | undefined> {
    return this.findOne({
      where: { id },
      relations: ['creations', 'creations.books'],
    });
  }
}
