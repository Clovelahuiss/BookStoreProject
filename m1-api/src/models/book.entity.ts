/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Creation } from './creation.entity';
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

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  price?: number;

  @ManyToOne(() => Creation, (creation) => creation.books)
  creation: Creation;

  @OneToMany(() => Review, (review) => review.book, { cascade: true })  // Ajout de la relation avec Review
  reviews: Review[];
}
