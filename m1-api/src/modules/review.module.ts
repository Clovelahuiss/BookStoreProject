/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from '../service/review.service';
import { ReviewController } from '../controller/review.controller';
import { Review } from '../models/review.entity';
import { Book } from '../models/book.entity';
import { BookRepository } from '../repository/book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Book])], // Ajoutez Book ici
  controllers: [ReviewController],
  providers: [ReviewService, BookRepository], // Ajoutez BookRepository comme provider
  exports: [ReviewService],
})
export class ReviewModule {}
