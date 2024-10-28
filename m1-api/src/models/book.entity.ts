/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Author } from './author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  publicationDate: string;

  @Column({ nullable: true })
  summary?: string;

  @ManyToOne(() => Author, (author) => author.books, {  onDelete: 'SET NULL' })
  author: Author;
}
