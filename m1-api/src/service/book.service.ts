/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from '../models/author.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookPresenter } from '../presenter/book.presenter';
import { CreateReviewDto } from '../dto/create-review.dto';
import { Review } from '../models/review.entity';
import { BookRepository } from '../repository/book.repository';
import { AuthorRepository } from '../repository/author.repository';
import { ReviewRepository } from '../repository/review.repository';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly authorRepository: AuthorRepository,
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async findAllBooks(title?: string, sortBy?: string, sortOrder: 'ASC' | 'DESC' = 'ASC'): Promise<BookPresenter[]> {
    const query = this.bookRepository.createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author');

    if (title) {
      query.andWhere('book.title LIKE :title', { title: `%${title}%` });
    }

    if (sortBy) {
      query.orderBy(`book.${sortBy}`, sortOrder);
    }

    const books = await query.getMany();
    return books.map((book) => new BookPresenter(book));
  }

  async findOneBook(id: number): Promise<BookPresenter> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['author', 'reviews'], // Charger l'auteur et les avis
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return new BookPresenter(book);
  }

  async deleteBook(id: number): Promise<void> {
    const deleteResult = await this.bookRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }

  async createBook(createBookDto: CreateBookDto): Promise<BookPresenter> {
    const { title, publicationDate, summary, authorId, price } = createBookDto;
    const author = await this.authorRepository.findOneBy({ id: authorId });
    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }

    const newBook = this.bookRepository.create({
      title,
      publicationDate,
      summary,
      price,
      author,
    });
    const savedBook = await this.bookRepository.save(newBook);
    return new BookPresenter(savedBook);
  }

  async addReview(bookId: number, createReviewDto: CreateReviewDto): Promise<Review> {
    const book = await this.bookRepository.findOneBy({ id: bookId });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    const review = this.reviewRepository.create({ ...createReviewDto, book });
    await this.reviewRepository.save(review);

    // Mettre à jour la note moyenne du livre
    const averageRating = await this.calculateAverageRating(bookId);
    await this.bookRepository.update(bookId, { averageRating });

    return review;
  }

  private async calculateAverageRating(bookId: number): Promise<number> {
    const { avg } = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avg')
      .where('review.bookId = :bookId', { bookId })
      .getRawOne();

    return parseFloat(avg) || 0;
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<BookPresenter> {
    const { authorId, ...rest } = updateBookDto;
    let author: Author = null;
    if (authorId) {
      author = await this.authorRepository.findOneBy({ id: authorId });
      if (!author) {
        throw new NotFoundException(`Author with ID ${authorId} not found`);
      }
    }

    await this.bookRepository.update(id, { ...rest, author });
    const updatedBook = await this.bookRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    return new BookPresenter(updatedBook);
  }
}
