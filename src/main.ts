import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './modules/app/interceptors/logging.interceptor';
import { LoggerService } from './modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(LoggerService));
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(LoggerService)));
  await app.listen(3000, () => console.log(`Server started on port 3000`));
}
bootstrap();
