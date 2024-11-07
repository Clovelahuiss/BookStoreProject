import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review/review.entity';
import { Book } from './book/book.entity';
import { BookModule } from './book/book.module';
import { DatabaseModule } from './modules/database.module';
import { AuthorModule } from './author/author.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    DatabaseModule,
    BookModule,
    AuthorModule,
    ReviewModule,
    TypeOrmModule.forFeature([Review, Book]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
