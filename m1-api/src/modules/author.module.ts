/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../models/author.entity';
import { AuthorRepository } from '../repository/author.repository';
import { AuthorService } from '../service/author.service';
import { AuthorController } from '../controller/author.controller';
import { CreationRepository } from '../repository/creation.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author, CreationRepository]),
  ],
  providers: [AuthorService, AuthorRepository],
  controllers: [AuthorController],
  exports: [AuthorRepository], })
export class AuthorModule {}
