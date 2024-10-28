/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../models/book.entity';
import { Author } from '../models/author.entity';
import { Review } from '../models/review.entity'; // Importer Review
import { BookService } from '../service/book.service';
import { BookController } from '../controller/book.controller';
import { AuthorModule } from './author.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Author, Review]), // Ajouter Review ici
    AuthorModule,
  ],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
