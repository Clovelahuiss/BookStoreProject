/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookService } from '../service/book.service';
import { Book } from '../models/book.entity';

@Controller('books')
export class BookController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(
    @Body('title') title: string,
    @Body('publicationDate') publicationDate: string,
    @Body('author') author: string,
  ): Promise<Book> {
    return this.bookService.createBook(title, publicationDate, author);
  }

  @Get()
  async findAllBooks(): Promise<Book[]> {
    return this.bookService.findAllBooks();
  }
}
