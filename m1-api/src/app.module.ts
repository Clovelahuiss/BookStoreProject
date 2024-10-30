import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './models/review.entity';
import { Book } from './models/book.entity';
import { BookModule } from './modules/book.module';
import { DatabaseModule } from './modules/database.module';
import { AuthorModule } from './modules/author.module';
import { ReviewModule } from './modules/review.module';

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
