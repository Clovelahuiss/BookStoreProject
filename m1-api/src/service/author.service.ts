/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../models/author.entity';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorRepository } from '../repository/author.repository';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorRepository)
    private authorRepository: AuthorRepository,

  ){}

  async findAllAuthors(search?: string) {
    const authorsQuery = this.authorRepository.createQueryBuilder('author')
      .leftJoinAndSelect('author.books', 'book');

    if (search) {
      authorsQuery.where('author.name LIKE :search', { search: `%${search}%` });
    }

    const authors = await authorsQuery.getMany();

    return authors.map(author => ({
      id: author.id,
      name: author.name,
      photo: author.photo,
      bookCount: author.books ? author.books.length : 0,
    }));
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const newAuthor = this.authorRepository.create(createAuthorDto);
    return await this.authorRepository.save(newAuthor);
  }

  async findAuthorById(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    await this.authorRepository.update(id, updateAuthorDto);
    return this.findAuthorById(id);
  }

  async deleteAuthor(id: number): Promise<void> {
    const deleteResult = await this.authorRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
  }
}
