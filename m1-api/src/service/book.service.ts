/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../models/book.entity';
import { Author } from '../models/author.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookPresenter } from '../presenter/book.presenter';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async createBook(createBookDto: CreateBookDto): Promise<BookPresenter> {
    const { title, publicationDate, summary, authorId } = createBookDto;
    const author = await this.authorRepository.findOneBy({ id: authorId });
    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }

    const newBook = this.bookRepository.create({
      title,
      publicationDate,
      summary,
      author,
    });
    const savedBook = await this.bookRepository.save(newBook);
    return new BookPresenter(savedBook);
  }

  async findAllBooks(): Promise<BookPresenter[]> {
    const books = await this.bookRepository.find();
    return books.map((book) => new BookPresenter(book));
  }

  async findOneBook(id: number): Promise<BookPresenter> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return new BookPresenter(book);
  }

  async deleteBook(id: number): Promise<void> {
    const deleteResult = await this.bookRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }
  

  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<BookPresenter> {
    const { authorId, ...rest } = updateBookDto;
    let author: Author = null;
    if (authorId) {
      author = await this.authorRepository.findOneBy({ id: authorId });
      if (!author) {
        throw new NotFoundException(`Author with ID ${authorId} not found`);
      }
    }

    await this.bookRepository.update(id, { ...rest, author });
    const updatedBook = await this.bookRepository.findOneBy({ id });
    return new BookPresenter(updatedBook);
  }
}
