import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// eslint-disable-next-line prettier/prettier
import { BookModule } from './modules/book.module';  
import { DatabaseModule } from './modules/database.module';
import { AuthorModule } from './modules/author.module';

@Module({
  imports: [DatabaseModule, BookModule, AuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
