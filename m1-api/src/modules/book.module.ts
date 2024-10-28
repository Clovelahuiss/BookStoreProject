/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../models/book.entity';
import { BookService } from '../service/book.service';
import { BookController } from '../controller/book.controller';
import { AuthorModule } from '../modules/author.module'; 
@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    AuthorModule, 
  ],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
