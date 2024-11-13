import { Injectable } from '@nestjs/common';
import { CreationRepository } from './creation.repository';
import { Creation } from './creation.entity';

@Injectable()
export class CreationService {
  constructor(private readonly creationRepository: CreationRepository) {}

  async getAllCreations(): Promise<Creation[]> {
    return this.creationRepository.findAllCreations();
  }

  async getAvailableCreationsForAuthor(): Promise<Creation[]> {
    return this.creationRepository.findAvailableCreations();
  }

  async createOrGetCreation(nomCreation: string): Promise<Creation> {
    return this.creationRepository.findOrCreate(nomCreation);
  }
}
