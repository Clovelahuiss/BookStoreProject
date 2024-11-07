import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { ReviewModule } from '../review/review.module';
import { AuthorModule } from '../author/author.module';
import { CreationModule } from '../creation/creation.module';
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
