import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Review } from '../models/review.entity';

@Injectable()
export class ReviewRepository extends Repository<Review> {
  constructor(private dataSource: DataSource) {
    super(Review, dataSource.createEntityManager());
  }

  // Méthode personnalisée pour trouver les avis par ID de livre
  async findReviewsByBookId(bookId: number): Promise<Review[]> {
    return this.find({ where: { book: { id: bookId } }, relations: ['book'] });
  }

  // Méthode personnalisée pour calculer la moyenne des notes d'un livre
  async calculateAverageRatingForBook(bookId: number): Promise<number> {
    const { avg } = await this.createQueryBuilder('review')
      .select('AVG(review.rating)', 'avg')
      .where('review.bookId = :bookId', { bookId })
      .getRawOne();

    return parseFloat(avg) || 0;
  }
}
