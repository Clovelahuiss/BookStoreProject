/* eslint-disable prettier/prettier */
// src/models/author.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Creation } from './creation.entity';
import { Book } from './book.entity';

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

  @ManyToOne(() => Creation, (creation) => creation.authors, { onDelete: 'SET NULL' })
  creation: Creation;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
