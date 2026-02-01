import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmEntity } from '../typeorm/film.entity';
import { Schedule } from '../typeorm/schedule.entity';
import { FilmsTypeOrmRepository } from '../repository/films.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEntity, Schedule])],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsTypeOrmRepository],
  exports: [FilmsTypeOrmRepository],
})
export class FilmsModule {}
