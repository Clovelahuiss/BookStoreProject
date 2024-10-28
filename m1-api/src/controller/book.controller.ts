/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { BookService } from '../service/book.service';
import { BookPresenter } from '../presenter/book.presenter';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(Number(id));
  }
  
  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<BookPresenter> {
    return this.bookService.createBook(createBookDto);
  }

  @Get()
  async findAllBooks(): Promise<BookPresenter[]> {
    return this.bookService.findAllBooks();
  }

  @Get(':id')
  async findOneBook(@Param('id') id: string): Promise<BookPresenter> {
    return this.bookService.findOneBook(Number(id));
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookPresenter> {
    return this.bookService.updateBook(Number(id), updateBookDto);
  }
}
