/* eslint-disable prettier/prettier */
import { IsInt, Min, Max, IsString, IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  comment?: string;
}
