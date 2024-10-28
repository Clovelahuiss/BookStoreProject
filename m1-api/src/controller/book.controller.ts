/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { BookService } from '../service/book.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookPresenter } from '../presenter/book.presenter';


@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<BookPresenter> {
    const { title, publicationDate, author, summary } = createBookDto;
    return this.bookService.createBook(title, publicationDate, author, summary);
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
    return this.bookService.updateBook(id, updateBookDto);
}

}
