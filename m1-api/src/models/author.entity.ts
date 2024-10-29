/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

  @OneToMany(() => Creation, (creation) => creation.author)
  creations: Creation[];
}

