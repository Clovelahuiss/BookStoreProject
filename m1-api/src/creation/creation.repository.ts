import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Creation } from './creation.entity';
import { Author } from '../author/author.entity';

@Injectable()
export class CreationRepository extends Repository<Creation> {
  constructor(private dataSource: DataSource) {
    super(Creation, dataSource.createEntityManager());
  }

  async findAvailableCreations(): Promise<Creation[]> {
    return this.createQueryBuilder('creation')
      .leftJoinAndSelect('creation.author', 'author')
      .where('author.id IS NULL')
      .getMany();
  }

  async findOrCreate(nomCreation: string, author?: Author): Promise<Creation> {
    if (!nomCreation) throw new BadRequestException('Nom de création requis');
    let creation = await this.findOne({ where: { nomCreation } });
    if (!creation) creation = this.create({ nomCreation, author });
    return this.save(creation);
  }

  async findAllCreations(): Promise<Creation[]> {
    return this.find();
  }
}
