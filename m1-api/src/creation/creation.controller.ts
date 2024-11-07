import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreationRepository } from '../creation/creation.repository';
import { Creation } from './creation.entity';

@Controller('creations')
export class CreationController {
  constructor(private readonly creationRepository: CreationRepository) {}

  @Get()
  async getAllCreations(): Promise<Creation[]> {
    return this.creationRepository.find();
  }

  @Post()
  async createCreation(
    @Body('nomCreation') nomCreation: string,
  ): Promise<Creation> {
    return this.creationRepository.findOrCreate(nomCreation);
  }

  @Get('available')
  async getAvailableCreations(): Promise<Creation[]> {
    return this.creationRepository.findAvailableCreations();
  }
}
