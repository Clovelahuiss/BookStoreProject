/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../models/author.entity';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorRepository } from '../repository/author.repository';
import { CreationRepository } from '../repository/creation.repository';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorRepository)
    private authorRepository: AuthorRepository,

    @InjectRepository(CreationRepository)
    private creationRepository: CreationRepository,

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
    const { name, bio, photo } = createAuthorDto;
    
    let creation = await this.creationRepository.findOne({ where: { nomAuteur: name } });
    
    if (!creation) {
      creation = this.creationRepository.create({ nomAuteur: name });
      await this.creationRepository.save(creation);
    }

    const author = this.authorRepository.create({
      name,
      bio,
      photo,
      creation,
    });

    return await this.authorRepository.save(author);
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

   async deleteAuthor(authorId: number): Promise<void> {
    const author = await this.authorRepository.findOne({ where: { id: authorId } });
    if (author) {
      await this.authorRepository.remove(author);
    }
  }
}
