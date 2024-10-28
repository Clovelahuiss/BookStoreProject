/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsNumber } from 'class-validator';

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
  authorId?: number; // ID de l'auteur (peut être mis à jour)
}
