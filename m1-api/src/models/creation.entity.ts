/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from './book.entity';
import { Author } from './author.entity';

@Entity()
export class Creation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomAuteur: string; // Nom de l'auteur au moment de la création

  @OneToMany(() => Book, (book) => book.creation, { cascade: true })
  books: Book[];

  @OneToMany(() => Author, (author) => author.creation, { cascade: true, onDelete: 'SET NULL' })
  authors: Author[];
}
