/* eslint-disable prettier/prettier */
import { IsInt, Min, Max, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number; // Note entre 1 et 5

  @IsString()
  @IsOptional()
  comment?: string;

  @IsNotEmpty()
  bookId: number;
}
