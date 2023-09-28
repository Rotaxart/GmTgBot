import { Module } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';
import { LoggerModule } from 'src/modules/logger/logger.module';

@Module({
  providers: [AuthMiddleware],
  exports: [AuthMiddleware],
  imports: [LoggerModule],
})
export class AuthMiddlewareModule {}
