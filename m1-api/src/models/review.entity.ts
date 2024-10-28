/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  rating: number; // Note entre 1 et 5

  @Column({ nullable: true })
  comment?: string;

  @ManyToOne(() => Book, (book) => book.reviews, { onDelete: 'CASCADE' }) // Relation avec Book
  book: Book;
}
