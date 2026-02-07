import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { FilmEntity } from './film.entity';

@Entity({ name: 'schedules' })
export class Schedule {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => FilmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'film_id' })
  film: FilmEntity;

  @Column('uuid')
  film_id: string;

  @Column('timestamptz')
  daytime: Date;

  @Column('int')
  hall: number;

  @Column('int')
  rows: number;

  @Column('int')
  seats: number;

  @Column('int')
  price: number;

  @Column('text', { array: true, default: () => 'ARRAY[]::text[]' })
  taken: string[];
}
