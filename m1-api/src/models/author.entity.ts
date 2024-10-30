import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Creation } from './creation.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  photo?: string;

  @OneToMany(() => Creation, (creation) => creation.author)
  creations: Creation[];

  getAverageRating() {
    const books = this.creations.flatMap((creation) => creation.books || []);
    const totalRatings = books.reduce(
      (sum, book) => sum + (book.averageRating || 0),
      0,
    );
    return books.length ? totalRatings / books.length : null;
  }
}
