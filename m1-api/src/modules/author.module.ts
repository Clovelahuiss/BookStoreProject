/* eslint-disable prettier/prettier */
import { Module, forwardRef} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../models/author.entity';
import { AuthorRepository } from '../repository/author.repository';
import { AuthorService } from '../service/author.service';
import { AuthorController } from '../controller/author.controller';
import { CreationModule } from './creation.module'; // Importation du CreationModule
import { BookModule } from './book.module';  // Importer le BookModule

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
