import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.entity';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './create-book.dto';
import { UpdateBookDto } from './update-book.dto';
import { CreationRepository } from '../creation/creation.repository';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly creationRepository: CreationRepository,
  ) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { creationId, ...bookData } = createBookDto;
    const creation = await this.creationRepository.findOne({
      where: { id: creationId },
    });
    if (!creation)
      throw new NotFoundException(`Creation with ID ${creationId} not found`);

    const book = this.bookRepository.create({ ...bookData, creation });
    return this.bookRepository.save(book);
  }

  async findAllBooks(
    title?: string,
    sortBy = 'averageRating',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<Book[]> {
    const query = this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.creation', 'creation')
      .leftJoinAndSelect('creation.author', 'author');

    if (title) query.where('book.title LIKE :title', { title: `%${title}%` });
    query.orderBy(`book.${sortBy}`, sortOrder);

    return query.getMany();
  }

  async findOneBook(id: number): Promise<Book> {
    const book = await this.bookRepository.findBookById(id);
    if (!book) throw new NotFoundException(`Book with ID ${id} not found`);
    return book;
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOneBook(id);
    Object.assign(book, updateBookDto);
    return this.bookRepository.save(book);
  }

  async deleteBook(id: number): Promise<void> {
    const book = await this.findOneBook(id);
    await this.bookRepository.remove(book);
  }
}
