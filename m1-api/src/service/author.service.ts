/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../models/author.entity';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorPresenter } from '../presenter/author.presenter';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<AuthorPresenter> {
    const newAuthor = this.authorRepository.create(createAuthorDto);
    const savedAuthor = await this.authorRepository.save(newAuthor);
    return new AuthorPresenter(savedAuthor); // Conversion en AuthorPresenter
  }

  async findAllAuthors(): Promise<AuthorPresenter[]> {
    const authors = await this.authorRepository.find();
    return authors.map(author => new AuthorPresenter(author));
  }

  async findAuthorById(id: number): Promise<AuthorPresenter> {
    const author = await this.authorRepository.findOneBy({ id });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return new AuthorPresenter(author);
  }

  async updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto): Promise<AuthorPresenter> {
    await this.authorRepository.update(id, updateAuthorDto);
    const updatedAuthor = await this.findAuthorById(id);
    return new AuthorPresenter(updatedAuthor);
  }

  async deleteAuthor(id: number): Promise<void> {
    const deleteResult = await this.authorRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
  }
}
