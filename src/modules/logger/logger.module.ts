import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logs } from './entities/logs.entity';
import { LoggerService } from './logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Logs])],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
