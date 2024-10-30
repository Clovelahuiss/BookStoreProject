import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Author } from './author.entity';
import { Book } from './book.entity';

@Entity()
export class Creation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomCreation: string;

  @ManyToOne(() => Author, (author) => author.creations, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  author?: Author; // Relation optionnelle avec l'auteur

  @OneToMany(() => Book, (book) => book.creation)
  books: Book[];
}
