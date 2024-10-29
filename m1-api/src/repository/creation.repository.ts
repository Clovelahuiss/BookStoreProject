/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Creation } from '../models/creation.entity';

@Injectable()
export class CreationRepository extends Repository<Creation> {
  constructor(private dataSource: DataSource) {
    super(Creation, dataSource.createEntityManager());
  }

  // Méthode pour trouver toutes les créations avec les auteurs et les livres liés, si nécessaire
  async findAllCreationsWithDetails(): Promise<Creation[]> {
    return this.find({ relations: ['author', 'books'] });
  }

  // Méthode pour trouver une création par nom de créateur
  async findByName(nomAuteur: string): Promise<Creation | null> {
    return this.findOne({ where: { nomAuteur } });
  }
  // Méthode pour trouver ou créer une nouvelle création
  async findOrCreate(nomAuteur: string): Promise<Creation> {
    let creation = await this.findByName(nomAuteur);

    // Si la création n'existe pas, on la crée
    if (!creation) {
      creation = this.create({ nomAuteur });
      await this.save(creation);
    }

    return creation;
  }
}
