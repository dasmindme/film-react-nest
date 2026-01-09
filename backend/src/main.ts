import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { AppLogger } from './loggers/app.logger';

async function bootstrap() {
  const logger = new AppLogger();

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  const port = 3000;
  await app.listen(port);
  logger.log(`Backend started on http://localhost:${port}/api/afisha`);
}
bootstrap();
