import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../models/book.entity';
import { BookService } from '../service/book.service';
import { BookController } from '../controller/book.controller';
import { BookRepository } from '../repository/book.repository';
import { ReviewModule } from './review.module';
import { AuthorModule } from './author.module';
import { CreationModule } from './creation.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    forwardRef(() => ReviewModule),
    forwardRef(() => AuthorModule),
    CreationModule,
  ],
  providers: [BookService, BookRepository],
  controllers: [BookController],
  exports: [BookRepository],
})
export class BookModule {}
