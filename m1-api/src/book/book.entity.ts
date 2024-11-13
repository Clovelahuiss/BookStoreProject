import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Creation } from '../creation/creation.entity';
import { Review } from '../review/review.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  coverImageUrl?: string;

  @Column()
  publicationDate: string;

  @Column({ nullable: true })
  summary?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  price?: number;

  @Column({ type: 'float', default: 0 })
  averageRating: number;

  @ManyToOne(() => Creation, (creation) => creation.books)
  creation: Creation;

  @OneToMany(() => Review, (review) => review.book, { cascade: true })
  reviews: Review[];
}
