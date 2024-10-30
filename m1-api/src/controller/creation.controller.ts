import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreationRepository } from '../repository/creation.repository';
import { Creation } from '../models/creation.entity';

@Controller('creations')
export class CreationController {
  constructor(private readonly creationRepository: CreationRepository) {}

  @Get()
  async getAllCreations(): Promise<Creation[]> {
    return this.creationRepository.find();
  }

  @Post()
  async createCreation(
    @Body('nomAuteur') nomAuteur: string,
  ): Promise<Creation> {
    return this.creationRepository.findOrCreate(nomAuteur);
  }
}
