/* eslint-disable prettier/prettier */
// review.controller.ts
import { Controller, Get, Post, Delete, Param, Body, HttpStatus, HttpException } from '@nestjs/common';
import { ReviewService } from '../service/review.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { Review } from '../models/review.entity';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async addReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    try {
      return await this.reviewService.addReview(createReviewDto);
    } catch (error) {
      throw new HttpException((error as Error).message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':bookId')
  async getReviewsByBookId(@Param('bookId') bookId: number): Promise<Review[]> {
    try {
      return await this.reviewService.getReviewsByBookId(bookId);
    } catch (error) {
      throw new HttpException((error as Error).message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':reviewId')
  async deleteReview(@Param('reviewId') reviewId: number): Promise<void> {
    try {
      await this.reviewService.deleteReview(reviewId);
    } catch (error) {
      throw new HttpException((error as Error).message, HttpStatus.NOT_FOUND);
    }
  }
}
