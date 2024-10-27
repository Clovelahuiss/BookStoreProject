/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../models/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async createBook(
    title: string,
    publicationDate: string,
    author: string,
  ): Promise<Book> {
    const newBook = this.bookRepository.create({
      title,
      publicationDate,
      author,
    });
    return this.bookRepository.save(newBook);
  }

  async findAllBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }
}
