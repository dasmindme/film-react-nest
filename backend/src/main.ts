import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { AppLogger } from './loggers/app.logger';
import { JsonLogger } from './loggers/json.logger';
import { TskvLogger } from './loggers/tskv.logger';

function createLogger() {
  const mode = process.env.LOGGER_MODE ?? 'dev';

  switch (mode) {
    case 'json':
      return new JsonLogger();
    case 'tskv':
      return new TskvLogger();
    case 'dev':
    default:
      return new AppLogger();
  }
}

async function bootstrap() {
  const logger = createLogger();

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useLogger(logger);

  const port = 3000;
  await app.listen(port);
  logger.log(`Backend started on http://localhost:${port}/api/afisha`);
}
bootstrap();
