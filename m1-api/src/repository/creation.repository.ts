/* eslint-disable prettier/prettier */

import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Creation } from '../models/creation.entity';
import { Author } from '../models/author.entity';

@Injectable()
export class CreationRepository extends Repository<Creation> {
  constructor(private dataSource: DataSource) {
    super(Creation, dataSource.createEntityManager());
  }

  async findOrCreate(nomCreation: string, author?: Author): Promise<Creation> {
    // Vérifiez si nomCreation est défini
    if (!nomCreation) {
      throw new BadRequestException("Le champ 'nomCreation' est requis pour créer une création.");
    }

    let creation = await this.findOne({ where: { nomCreation } });

    // Si la création n'existe pas, créez-la
    if (!creation) {
      creation = this.create({ nomCreation, author });
      await this.save(creation);
    }

    return creation;
  }
}
