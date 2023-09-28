import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/modules/logger/logger.service';
import { TelegrafContext } from '../context/telegraf-context.interface';

@Injectable()
export class AuthMiddleware {
  constructor(private logger: LoggerService) {}
  middleware() {
    return async (ctx: TelegrafContext, next) => {
      if (process.env.NODE_ENV === 'dev') this.logger.log(ctx.from);
      next();
    };
  }
}
