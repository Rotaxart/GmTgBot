import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from 'src/modules/logger/logger.service';

export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: LoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(
          () =>
            context.switchToHttp().getRequest()?.originalUrl &&
            this.logger.logWithPost(
              `${context.switchToHttp().getRequest().originalUrl} ${
                Date.now() - now
              }ms`,
            ),
        ),
      );
  }
}
