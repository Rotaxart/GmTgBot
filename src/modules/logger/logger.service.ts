import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logs } from './entities/logs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor(
    @InjectRepository(Logs) private readonly logsRepositiory: Repository<Logs>,
  ) {
    super('DbLogger');
  }

  logWithPost(message: string, params?: any[]) {
    this.log(message, params);
    this.logsRepositiory.save({ message, type: 'log' });
  }

  errorWithPost(message: string, params?: any[]) {
    this.error(message, params);
    this.logsRepositiory.save({ message, type: 'error' });
  }

  warnWithPost(message: string, params?: any[]) {
    this.warn(message, params);
    this.logsRepositiory.save({ message, type: 'warn' });
  }
}
