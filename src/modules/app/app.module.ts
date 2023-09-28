import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/modules/user.module';
import { MessageModule } from '../message/modules/message.module';
import { LoggerModule } from '../logger/logger.module';
import { TelegramModule } from '../telegram/telegram.module';
import { OpenaiModule } from '../openai/openai.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          synchronize: true,
          entities: [__dirname + '/../**/entities/*.entity{.js, .ts}'],
        };
      },
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    UserModule,
    MessageModule,
    LoggerModule,
    TelegramModule,
    OpenaiModule,
  ],
})
export class AppModule {}
