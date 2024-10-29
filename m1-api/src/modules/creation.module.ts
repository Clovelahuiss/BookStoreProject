/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creation } from '../models/creation.entity';
import { CreationRepository } from '../repository/creation.repository';
import { CreationController } from '../controller/creation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Creation]), 
],
  providers: [CreationRepository],
  controllers: [CreationController],
  exports: [CreationRepository, TypeOrmModule],
})
export class CreationModule {}
