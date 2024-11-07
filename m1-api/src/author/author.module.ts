import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { AuthorRepository } from './author.repository';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { CreationModule } from '../creation/creation.module';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author]),
    CreationModule,
    forwardRef(() => BookModule),
  ],
  providers: [AuthorService, AuthorRepository],
  controllers: [AuthorController],
  exports: [AuthorRepository],
})
export class AuthorModule {}
