import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Film } from '../films/entities/film.entity';
import {
  FilmsListResponse,
  FilmScheduleResponse,
} from '../films/dto/films.dto';

@Injectable()
export class FilmsMongoDBRepository {
  constructor(@InjectModel('Film') private readonly filmModel: Model<Film>) {}

  async findAll(): Promise<FilmsListResponse> {
    const films = await this.filmModel.find().lean().exec();
    return {
      total: films.length,
      items: films,
    };
  }

  async findOne(id: string): Promise<Film | null> {
    return this.filmModel.findOne({ id }).exec();
  }

  async getSchedule(id: string): Promise<FilmScheduleResponse | null> {
    const film = await this.filmModel
      .findOne({ id }, { schedule: 1, _id: 0 })
      .lean()
      .exec();

    if (!film) {
      return null;
    }

    const schedule = film.schedule ?? [];
    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
