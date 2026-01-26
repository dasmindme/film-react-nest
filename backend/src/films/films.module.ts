import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmSchema } from './entities/film.entity';
import { FilmsMongoDBRepository } from '../repository/films.mongodb.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Film', schema: FilmSchema, collection: 'films' },
    ]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsMongoDBRepository],
  exports: [FilmsMongoDBRepository],
})
export class FilmsModule {}
