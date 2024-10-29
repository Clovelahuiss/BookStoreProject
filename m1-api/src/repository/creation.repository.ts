/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Creation } from '../models/creation.entity';

@Injectable()
export class CreationRepository extends Repository<Creation> {
  constructor(private dataSource: DataSource) {
    super(Creation, dataSource.createEntityManager());
  }

  async findOrCreate(nomAuteur: string): Promise<Creation> {
    let creation = await this.findOne({ where: { nomAuteur } });

    if (!creation) {
      creation = this.create({ nomAuteur });
      await this.save(creation);
    }

    return creation;
  }
}
