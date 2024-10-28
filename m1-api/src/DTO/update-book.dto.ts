/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsNumber, IsDecimal } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  publicationDate?: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsNumber()
  @IsOptional()
  authorId?: number;

  @IsDecimal()
  @IsOptional()
  price?: number; // Prix du livre
}
