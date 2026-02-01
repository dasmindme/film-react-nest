import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'films' })
export class FilmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('numeric', { precision: 3, scale: 1 })
  rating: number;

  @Column('text')
  director: string;

  @Column('text', { array: true })
  tags: string[];

  @Column('text')
  image: string;

  @Column('text')
  cover: string;

  @Column('text')
  title: string;

  @Column('text')
  about: string;

  @Column('text')
  description: string;
}
