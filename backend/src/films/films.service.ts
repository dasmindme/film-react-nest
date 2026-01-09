import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsListResponse, FilmScheduleResponse } from './dto/films.dto';
import { FilmsMongoDBRepository } from '../repository/films.mongodb.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepo: FilmsMongoDBRepository) {}

  async findAll(): Promise<FilmsListResponse> {
    return this.filmsRepo.findAll();
  }

  async findOne(id: string) {
    const film = await this.filmsRepo.findOne(id);
    if (!film) {
      throw new NotFoundException('Фильм не найден');
    }
    return film;
  }

  async getSchedule(id: string): Promise<FilmScheduleResponse> {
    const schedule = await this.filmsRepo.getSchedule(id);

    if (!schedule) {
      throw new NotFoundException('Фильм не найден');
    }

    return schedule;
  }
}
