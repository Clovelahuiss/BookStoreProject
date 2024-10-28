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
  bio?: string;

  @Column({ nullable: true })
  photo?: string; // Ajout du champ photo

  @OneToMany(() => Book, (book) => book.author, { eager: true })
  books: Book[];
}
