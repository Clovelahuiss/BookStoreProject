import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from './author.entity';
import { AuthorRepository } from './author.repository';
import { CreateAuthorDto } from './create-author.dto';
import { UpdateAuthorDto } from './update-author.dto';
import { CreationRepository } from '../creation/creation.repository';

@Injectable()
export class AuthorService {
  constructor(
    private authorRepository: AuthorRepository,
    private creationRepository: CreationRepository,
  ) {}

  async findAllAuthors(search?: string) {
    // Construire la requête de base pour récupérer les auteurs avec leurs créations et livres associés
    const authorsQuery = this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.creations', 'creation')
      .leftJoinAndSelect('creation.books', 'book');

    // Appliquer le filtre si 'search' est défini
    if (search) {
      authorsQuery.where('author.name LIKE :search', { search: `%${search}%` });
    }

    const authors = await authorsQuery.getMany();

    // Calculer le nombre de livres et la note moyenne pour chaque auteur
    return authors.map((author) => {
      const books = author.creations.flatMap(
        (creation) => creation.books || [],
      );
      const averageRating = books.length
        ? books.reduce((sum, book) => sum + (book.averageRating || 0), 0) /
          books.length
        : null;
      return { ...author, bookCount: books.length, averageRating };
    });
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const { creationId, ...authorData } = createAuthorDto;
    const author = this.authorRepository.create(authorData);

    if (creationId) {
      const creation = await this.creationRepository.findOne({
        where: { id: creationId },
      });
      if (creation) author.creations = [creation];
    }

    return this.authorRepository.save(author);
  }

  async findAuthorById(id: number): Promise<Author> {
    const author = await this.authorRepository.findOneWithDetails(id);
    if (!author) throw new NotFoundException(`Author with ID ${id} not found`);
    return author;
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

  async findAllWithPagination(limit: number, offset: number, search?: string) {
    const query = this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.creations', 'creation')
      .leftJoinAndSelect('creation.books', 'book');

    if (search) {
      query.where('author.name LIKE :search', { search: `%${search}%` });
    }

    // Utilisation de la pagination
    const [authors, total] = await query
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    // Calcul des informations supplémentaires pour chaque auteur
    const authorsWithDetails = authors.map((author) => {
      const books = author.creations.flatMap(
        (creation) => creation.books || [],
      );
      const averageRating = books.length
        ? books.reduce((sum, book) => sum + (book.averageRating || 0), 0) /
          books.length
        : null;
      return { ...author, bookCount: books.length, averageRating };
    });

    return {
      authors: authorsWithDetails,
      total,
    };
  }
}
