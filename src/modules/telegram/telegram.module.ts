import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as LocalSession from 'telegraf-session-local';
import { BotUpdate } from './update/bot.update';
import { UserModule } from '../user/modules/user.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AuthMiddlewareModule } from './middleware/auth-middlewate.module';
import { LoggerModule } from '../logger/logger.module';
import { MessageModule } from '../message/modules/message.module';
import { OpenaiModule } from '../openai/openai.module';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
  providers: [TelegramService, BotUpdate, AuthMiddleware],
  exports: [],
  imports: [
    ConfigModule,
    UserModule,
    OpenaiModule,
    LoggerModule,
    MessageModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule, AuthMiddlewareModule],
      inject: [ConfigService, AuthMiddleware],
      useFactory: (configService: ConfigService, auth: AuthMiddleware) => ({
        middlewares: [sessions.middleware(), auth],
        token: configService.get('TELEGRAM_BOT_TOKEN'),
      }),
    }),
  ],
})
export class TelegramModule {}
