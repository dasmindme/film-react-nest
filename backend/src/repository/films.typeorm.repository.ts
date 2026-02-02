import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { FilmEntity } from '../typeorm/film.entity';
import { Schedule } from '../typeorm/schedule.entity';
import {
  FilmsListResponse,
  FilmScheduleResponse,
  GetScheduleDTO,
} from '../films/dto/films.dto';

@Injectable()
export class FilmsTypeOrmRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmRepo: Repository<FilmEntity>,
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async findAll(): Promise<FilmsListResponse> {
    const films = await this.filmRepo.find();
    return {
      total: films.length,
      items: films,
    };
  }

  async findOne(id: string): Promise<FilmEntity | null> {
    return this.filmRepo.findOne({ where: { id } });
  }

  async getSchedule(id: string): Promise<FilmScheduleResponse | null> {
    const schedules = await this.scheduleRepo.find({ where: { film_id: id } });

    if (!schedules.length) {
      return null;
    }

    const raw = schedules.map((s) => ({
      id: s.id,
      daytime: s.daytime.toISOString(),
      hall: s.hall,
      rows: s.rows,
      seats: s.seats,
      price: s.price,
      taken: s.taken,
    }));

    const items = plainToInstance(GetScheduleDTO, raw, {
      excludeExtraneousValues: true,
    });

    return {
      total: items.length,
      items,
    };
  }
}
