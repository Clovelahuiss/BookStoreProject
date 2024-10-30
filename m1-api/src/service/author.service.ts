import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from '../models/author.entity';
import { AuthorRepository } from '../repository/author.repository';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { CreationRepository } from '../repository/creation.repository';
import { BookRepository } from '../repository/book.repository';

@Injectable()
export class AuthorService {
  constructor(
    private authorRepository: AuthorRepository,
    private creationRepository: CreationRepository,
    private bookRepository: BookRepository,
  ) {}

  async findAllAuthors(search?: string) {
    const authorsQuery = this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.creations', 'creation')
      .leftJoinAndSelect('creation.books', 'book');

    if (search) {
      authorsQuery.where('author.name LIKE :search', { search: `%${search}%` });
    }

    const authors = await authorsQuery.getMany();

    return authors.map((author) => {
      const books = author.creations.flatMap(
        (creation) => creation.books || [],
      );
      const totalRatings = books.reduce(
        (sum, book) => sum + (book.averageRating || 0),
        0,
      );
      const averageRating = books.length ? totalRatings / books.length : null;

      return {
        id: author.id,
        name: author.name,
        photo: author.photo,
        bio: author.bio,
        bookCount: books.length,
        idCreations: author.creations.map((creation) => creation.id) || [],
        averageRating: averageRating, // Ajoute la moyenne des notes ici
      };
    });
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const { name, bio, photo, nomCreation } = createAuthorDto;

    // Crée l'auteur
    const author = this.authorRepository.create({ name, bio, photo });
    await this.authorRepository.save(author);

    // Associe la création à l'auteur
    await this.creationRepository.findOrCreate(nomCreation, author);

    return author;
  }

  async findAuthorById(id: number): Promise<Author> {
    const author = await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.creations', 'creation')
      .leftJoinAndSelect('creation.books', 'book') // Jointure pour récupérer les livres de chaque création
      .where('author.id = :id', { id })
      .getOne();

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return author;
  }

  async findAllWithPagination(limit: number, offset: number) {
    const [authors, total] = await this.authorRepository.findAndCount({
      skip: offset,
      take: limit,
    });
    return { authors, total };
  }

  async updateAuthor(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    await this.authorRepository.update(id, updateAuthorDto);
    return this.findAuthorById(id);
  }

  async deleteAuthor(id: number): Promise<void> {
    const author = await this.findAuthorById(id);
    await this.authorRepository.remove(author);
  }
}
