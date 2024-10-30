import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../models/review.entity';
import { CreateReviewDto } from '../dto/create-review.dto';
import { BookRepository } from '../repository/book.repository';
import { UpdateReviewDto } from '../dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly bookRepository: BookRepository,
  ) {}

  // Ajouter une note pour un livre
  async addReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const { bookId, rating, comment } = createReviewDto;
    const book = await this.bookRepository.findOneBy({ id: bookId });

    if (!book) {
      throw new NotFoundException(`Livre avec ID ${bookId} non trouvé`);
    }

    const review = this.reviewRepository.create({
      rating,
      comment,
      book,
    });
    await this.reviewRepository.save(review);

    // Calculer et mettre à jour la moyenne
    const averageRating = await this.calculateAverageRating(bookId);
    await this.bookRepository.update(bookId, { averageRating });

    return review;
  }

  async updateReview(
    reviewId: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: ['book'],
    });

    if (!review) {
      throw new NotFoundException(`Avis avec ID ${reviewId} non trouvé`);
    }

    Object.assign(review, updateReviewDto);
    await this.reviewRepository.save(review);

    // Recalcul de la moyenne après mise à jour de l'avis
    const averageRating = await this.calculateAverageRating(review.book.id);
    await this.bookRepository.update(review.book.id, { averageRating });

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

  // Calculer et mettre à jour la note moyenne du livre
  private async updateAverageRating(bookId: number): Promise<void> {
    const { avg } = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avg')
      .where('review.bookId = :bookId', { bookId })
      .getRawOne();

    const averageRating = parseFloat(avg) || 0;

    await this.bookRepository.update(bookId, { averageRating });
  }

  // Récupérer toutes les notes d'un livre
  async getReviewsByBookId(bookId: number): Promise<Review[]> {
    return this.reviewRepository.find({ where: { book: { id: bookId } } });
  }

  async deleteReview(reviewId: number): Promise<void> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: ['book'],
    });

    if (!review) {
      throw new NotFoundException(`Avis avec ID ${reviewId} non trouvé`);
    }

    await this.reviewRepository.remove(review);

    // Recalcul de la moyenne après suppression de l'avis
    const averageRating = await this.calculateAverageRating(review.book.id);
    await this.bookRepository.update(review.book.id, { averageRating });
  }
}
