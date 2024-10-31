// src/dto/create-author.dto.ts
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsNumber()
  @IsOptional()
  creationId?: number;
}
