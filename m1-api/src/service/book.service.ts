/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../models/book.entity';
import { UpdateBookDto } from 'src/dto/update-book.dto';
import { BookPresenter } from '../presenter/book.presenter';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {    console.log('BookRepository injected:', !!this.bookRepository);
  }
  

  async createBook(title: string, publicationDate: string, author: string): Promise<BookPresenter> {
    const newBook = this.bookRepository.create({ title, publicationDate, author });
    const savedBook = await this.bookRepository.save(newBook);
    return new BookPresenter(savedBook);
  }

  async findAllBooks(): Promise<Book[]> {
    console.log('findAllBooks called');
    const books = await this.bookRepository.find();
    return books.map(book => new BookPresenter(book));
  }
  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    await this.bookRepository.update(id, updateBookDto);
    return this.bookRepository.findOneBy({ id: +id });
  }

}
