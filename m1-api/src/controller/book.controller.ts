/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { BookService } from '../service/book.service';
import { Book } from '../models/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    const { title, publicationDate, author } = createBookDto;
    return this.bookService.createBook(title, publicationDate, author);
  }

  @Get()
  async findAllBooks(): Promise<Book[]> {
    console.log('GET /books endpoint called');
    return this.bookService.findAllBooks();
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateBook(id, updateBookDto);
  }
}
