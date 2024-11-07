import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creation } from '../creation/creation.entity';
import { CreationRepository } from '../creation/creation.repository';
import { CreationController } from '../creation/creation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Creation])],
  providers: [CreationRepository],
  controllers: [CreationController],
  exports: [CreationRepository, TypeOrmModule],
})
export class CreationModule {}
