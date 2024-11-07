import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { ReviewController } from '../review/review.controller';
import { Review } from './review.entity';
import { Book } from '../book/book.entity';
import { BookRepository } from '../book/book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Book])],
  controllers: [ReviewController],
  providers: [ReviewService, BookRepository],
  exports: [ReviewService],
})
export class ReviewModule {}
