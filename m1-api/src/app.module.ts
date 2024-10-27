import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// eslint-disable-next-line prettier/prettier
import { BookModule } from './modules/book/book.module';  
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [DatabaseModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
