import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreationService } from './creation.service';
import { CreationRepository } from './creation.repository';
import { Creation } from './creation.entity';

@Controller('creations')
export class CreationController {
  constructor(
    private readonly creationService: CreationService,
    private readonly creationRepository: CreationRepository,
  ) {}

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

  @Delete(':id')
  async deleteCreation(@Param('id') id: string): Promise<void> {
    try {
      await this.creationService.deleteCreation(Number(id));
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Création avec l'id ${id} non trouvée`);
      }
      throw error;
    }
  }
}
