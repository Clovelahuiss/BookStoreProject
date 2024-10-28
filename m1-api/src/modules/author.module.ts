/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../models/author.entity';
import { AuthorService } from '../service/author.service';
import { AuthorController } from '../controller/author.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorService],
  controllers: [AuthorController],
  exports: [TypeOrmModule], // Exporte TypeOrmModule pour rendre AuthorRepository accessible
})
export class AuthorModule {}
