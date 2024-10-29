/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Creation } from './creation.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  photo?: string;

  @ManyToOne(() => Creation, (creation) => creation.author, { onDelete: 'SET NULL' })
  creation: Creation;
}
