import { Expose } from 'class-transformer';

export class BookResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  publicationDate: string;

  @Expose()
  author: string;
}
