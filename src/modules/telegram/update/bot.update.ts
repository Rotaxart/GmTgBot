import {
  Update,
  Ctx,
  Start,
  Help,
  On,
  Hears,
  InjectBot,
  Sender,
} from 'nestjs-telegraf';
import { TelegrafContext } from '../context/telegraf-context.interface';
import { Telegraf } from 'telegraf';
import { TelegramService } from '../telegram.service';
import { actionButtons } from '../buttons/action.button';
import { Inject } from '@nestjs/common';
import { State } from '../enums/states.enum';
import { OpenaiService } from 'src/modules/openai/openai.service';
import { goodDayPrompt } from 'src/modules/openai/promts/good-day.prompt';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<TelegrafContext>,
    @Inject(TelegramService) private readonly telegramService: TelegramService,
    @Inject(OpenaiService) private readonly openaiService: OpenaiService,
  ) {}

  @Start()
  async start(@Ctx() ctx: TelegrafContext, @Sender() sender) {
    this.telegramService.authorizeUser(sender);
    await ctx.reply(`Welcome, ${sender.first_name}!`);
    await ctx.reply('Choose action', actionButtons());
  }

  @Help()
  async help(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async on(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('👍');
  }
  @Hears('Write me')
  async message(@Ctx() ctx: TelegrafContext) {
    ctx.session.state = State.WAITING_MESSAGE;
    await ctx.reply('Write a message');
  }
  @Hears('Users')
  async hears(@Ctx() ctx: TelegrafContext) {
    console.log(await this.telegramService.getUserList());
    await ctx.replyWithHTML(await this.telegramService.getUserList());
  }
  @Hears('Good day')
  async goodDay(@Ctx() ctx: TelegrafContext) {
    const text = await this.openaiService.createReqest(
      goodDayPrompt(
        ctx.from.first_name || ctx.from.last_name || ctx.from.username,
      ),
    );
    this.bot.telegram.sendMessage(ctx.chat.id, text);
  }
  @On('text')
  async getMessage(@Ctx() ctx: TelegrafContext) {
    switch (ctx.session.state) {
      case State.WAITING_MESSAGE:
        try {
          this.telegramService.createMessage(ctx);
          ctx.reply(
            'Success! I`ll contact you in a short time!',
            actionButtons(),
          );
          ctx.forwardMessage(process.env.TELEGRAM_ID_ARTEM);
        } catch (error) {
          ctx.reply('error', actionButtons());
        } finally {
          ctx.session.state = null;
        }
        break;
      default:
        if (
          ctx.message &&
          'reply_to_message' &&
          'text' in ctx.message &&
          ctx.message.reply_to_message &&
          'forward_from' in ctx.message.reply_to_message
        ) {
          console.log(
            ctx.message,
            ctx.message.reply_to_message.forward_from.id,
          );
          ctx.forwardMessage(ctx.message.reply_to_message.forward_from.id);
        }
        break;
    }
  }
}
