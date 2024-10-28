/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../models/book.entity';
import { UpdateBookDto } from 'src/dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {    console.log('BookRepository injected:', !!this.bookRepository);
  }
  

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
    console.log('findAllBooks called');
    return this.bookRepository.find();
  }
  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    await this.bookRepository.update(id, updateBookDto);
    return this.bookRepository.findOneBy({ id: +id });
  }

}
