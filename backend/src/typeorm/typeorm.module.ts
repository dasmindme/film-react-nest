import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { FilmEntity } from './film.entity';
import { Schedule } from './schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST', 'localhost'),
        port: Number(config.get<string>('DATABASE_PORT', '5432')),
        username: config.get<string>('DATABASE_USERNAME'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        entities: [FilmEntity, Schedule],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([FilmEntity, Schedule]),
  ],
  exports: [TypeOrmModule],
})
export class TypeOrmConfigModule {}
