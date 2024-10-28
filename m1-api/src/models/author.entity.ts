/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  @Column({ nullable: true })
  bio?: string; // Optionnel : Biographie de l'auteur
  
  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
