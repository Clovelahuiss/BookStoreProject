/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Author } from './author.entity';
import { Book } from './book.entity';

@Entity()
export class Creation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomAuteur: string;

  @OneToOne(() => Author, (author) => author.creation) // Un seul auteur par création
  author: Author;

  @OneToMany(() => Book, (book) => book.creation) // Plusieurs livres par création
  books: Book[];
}
