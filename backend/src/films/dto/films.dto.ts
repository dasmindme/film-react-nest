import { Expose } from 'class-transformer';

export interface ListResponse<T> {
  total: number;
  items: T[];
}

export class GetFilmDTO {
  @Expose()
  id: string;

  @Expose()
  rating: number;

  @Expose()
  director: string;

  @Expose()
  tags: string[];

  @Expose()
  image: string;

  @Expose()
  cover: string;

  @Expose()
  title: string;

  @Expose()
  about: string;

  @Expose()
  description: string;
}

export class GetScheduleDTO {
  @Expose()
  id: string;

  @Expose()
  daytime: string;

  @Expose()
  hall: number;

  @Expose()
  rows: number;

  @Expose()
  seats: number;

  @Expose()
  price: number;

  @Expose()
  taken: string[];
}

export class CreateFilmDTO {
  @Expose()
  id: string;

  @Expose()
  rating: number;

  @Expose()
  director: string;

  @Expose()
  tags: string[];

  @Expose()
  image: string;

  @Expose()
  cover: string;

  @Expose()
  title: string;

  @Expose()
  about: string;

  @Expose()
  description: string;

  @Expose()
  schedule: GetScheduleDTO[];
}

export type FilmsListResponse = ListResponse<GetFilmDTO>;
export type FilmScheduleItem = GetScheduleDTO;
export type FilmScheduleResponse = ListResponse<FilmScheduleItem>;
