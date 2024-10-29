/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column({ type: 'text' })
  comment: string;

  @ManyToOne(() => Book, (book) => book.reviews, { onDelete: 'CASCADE' })  // Relation avec Book
  book: Book;
}
