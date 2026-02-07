import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { TypeOrmConfigModule } from './typeorm/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmConfigModule,
    FilmsModule,
    OrderModule,

    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'public'),
      serveRoot: '/content',
    }),
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
