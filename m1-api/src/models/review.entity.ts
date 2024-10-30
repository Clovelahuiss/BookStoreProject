/* eslint-disable prettier/prettier */
// src/models/review.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', width: 1 })
    rating: number;  // Note de 1 à 5

    @Column({ type: 'text', nullable: true })
    comment: string;  // Commentaire optionnel

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Book, (book) => book.reviews, { onDelete: 'CASCADE' })
    book: Book;
}
