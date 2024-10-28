/* eslint-disable prettier/prettier */
import { IsString, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  publicationDate?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  summary?: string; 
}
