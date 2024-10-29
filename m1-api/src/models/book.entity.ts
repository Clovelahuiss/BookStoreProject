/* eslint-disable prettier/prettier */
// src/models/book.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Creation } from './creation.entity';
import { Author } from './author.entity';
import { Review } from './review.entity';


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

  averageRating?: number;


  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  price?: number;

  @ManyToOne(() => Creation, (creation) => creation.books)
  creation: Creation;

  @ManyToOne(() => Author, (author) => author.books, { onDelete: 'SET NULL' })
  author: Author;

  @OneToMany(() => Review, (review) => review.book) // Relation avec les avis
  reviews: Review[];
}
