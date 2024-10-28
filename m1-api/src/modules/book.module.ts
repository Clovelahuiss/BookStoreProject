/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../models/book.entity';
import { BookService } from '../service/book.service';
import { BookController } from '../controller/book.controller';
import { BookRepository } from '../repository/book.repository';
import { ReviewModule } from './review.module'; // Importe ReviewModule
import { AuthorModule } from './author.module'; // Importe AuthorModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    forwardRef(() => ReviewModule),
     forwardRef(() => AuthorModule),  ],
  providers: [BookService, BookRepository],
  controllers: [BookController],
  exports: [BookRepository],
})
export class BookModule {}
