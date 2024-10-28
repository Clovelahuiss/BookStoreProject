/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
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

  @Column('decimal', { precision: 5, scale: 2, nullable: true }) // Prix du livre
  price?: number;

  @Column('float', { nullable: true }) // Note moyenne calculée
  averageRating?: number;

  @ManyToOne(() => Author, (author) => author.books, { onDelete: 'SET NULL' })
  author: Author;

  @OneToMany(() => Review, (review) => review.book) // Relation avec les avis
  reviews: Review[];
}
