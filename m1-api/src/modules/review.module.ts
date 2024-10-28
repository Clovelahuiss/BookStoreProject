/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../models/review.entity';
import { ReviewRepository } from '../repository/review.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewRepository],
  exports: [ReviewRepository],
})
export class ReviewModule {}
