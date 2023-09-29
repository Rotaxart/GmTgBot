import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { User } from 'telegraf/typings/core/types/typegram';
import { TelegrafContext } from './context/telegraf-context.interface';
import { MessageService } from '../message/services/message.service';
import { Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { Cron } from '@nestjs/schedule';
import { goodDayPrompt } from '../openai/promts/good-day.prompt';
import { OpenaiService } from '../openai/openai.service';

@Injectable()
export class TelegramService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(MessageService) private readonly messageService: MessageService,
    @Inject(OpenaiService) private readonly openaiService: OpenaiService,
    @InjectBot() private readonly bot: Telegraf<TelegrafContext>,
  ) { }

  async getUserList() {
    const users = await this.userService.findAll();
    return users
      .map(
        (user, i) => `${i + 1}) name: ${user.name}, username: ${user.username}`,
      )
      .join('\n');
  }

  async authorizeUser({ username, first_name }: User) {
    const user = await this.userService.findOne({ username });
    if (!user) {
      await this.userService.create({ username, name: first_name });
    }
  }

  async createMessage(ctx: TelegrafContext) {
    const user = await this.userService.findOne({
      username: ctx.from.username,
    });
    let text = '';
    if (ctx.message && 'text' in ctx.message) {
      text = ctx.message.text;
    }
    const message = this.messageService.create({ user, text });
    return message ?? null;
  }

  @Cron('0 12 * * *')
  async goodDayCron() {
    console.log('cron');
    const text = await this.openaiService.createReqest(goodDayPrompt());
    this.bot.telegram.sendMessage(process.env.TELEGRAM_ID_MARINA, text);
  }
}
