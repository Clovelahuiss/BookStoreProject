/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  publicationDate: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsOptional()
  summary?: string; 
}
