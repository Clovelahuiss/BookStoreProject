/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDecimal } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  publicationDate: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @IsDecimal()
  @IsOptional()
  price?: number; // Prix du livre
}
