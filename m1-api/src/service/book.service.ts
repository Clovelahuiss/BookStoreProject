/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException} from '@nestjs/common';
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
  

  async createBook(title: string, publicationDate: string, author: string, summary: string): Promise<BookPresenter> {
    const newBook = this.bookRepository.create({ title, publicationDate, author, summary });
    const savedBook = await this.bookRepository.save(newBook);
    return new BookPresenter(savedBook);
  }

  async findAllBooks(): Promise<Book[]> {
    console.log('findAllBooks called');
    const books = await this.bookRepository.find();
    return books.map(book => new BookPresenter(book));
  }
  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<BookPresenter> {
    const numericId = Number(id); // Conversion de l'ID en nombre
    await this.bookRepository.update(numericId, updateBookDto);
    return this.bookRepository.findOneBy({ id: numericId });
  }
  
  async findOneBook(id: number): Promise<BookPresenter> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return new BookPresenter(book);
  }

}
