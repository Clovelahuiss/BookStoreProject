import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creation } from '../creation/creation.entity';
import { CreationRepository } from '../creation/creation.repository';
import { CreationController } from '../creation/creation.controller';
import { CreationService } from './creation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Creation])],
  providers: [CreationRepository, CreationService],
  controllers: [CreationController],
  exports: [CreationRepository, TypeOrmModule],
})
export class CreationModule {}
