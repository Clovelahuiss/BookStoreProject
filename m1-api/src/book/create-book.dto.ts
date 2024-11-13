import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsDateString()
  publicationDate: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  coverImageUrl?: string;

  @IsNumber()
  creationId: number;
}
