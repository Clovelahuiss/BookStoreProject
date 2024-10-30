/* eslint-disable prettier/prettier */
/*Une fois le retour à la ligne fait ce sont des erreur 
prettier de formatage
 que je n'arrive pas a resuoudre*/
import { Controller, Get, Post, Put, Param, Body, Delete, Query } from '@nestjs/common';
import { BookService } from '../service/book.service';
import { BookPresenter } from '../presenter/book.presenter';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService  ) {}

  @Get()
  async findAllBooks(
    @Query('title') title?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC'
  ): Promise<BookPresenter[]> {
    return this.bookService.findAllBooks(title, sortBy, sortOrder);
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
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

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(Number(id));
  }

}
