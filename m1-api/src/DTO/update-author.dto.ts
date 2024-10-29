/* eslint-disable prettier/prettier */
import { IsString, IsOptional } from 'class-validator';

export class UpdateAuthorDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  photo?: string; // Champ photo ajouté pour permettre la mise à jour de la photo
}
