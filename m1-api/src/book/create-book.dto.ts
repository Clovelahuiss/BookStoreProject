import { IsNotEmpty, IsOptional, IsDecimal, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  publicationDate: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsDecimal()
  price?: number;

  @IsNotEmpty()
  creationId: number;
}
