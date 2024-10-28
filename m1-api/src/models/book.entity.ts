import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  publicationDate: string;

  @Column()
  author: string;

  @Column({ nullable: true }) // Rendre le champ optionnel
  summary?: string;
}
