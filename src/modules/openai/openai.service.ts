import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { ROLES } from './enums/roles.enum';

@Injectable()
export class OpenaiService {
  openai: OpenAI;
  model: string;
  constructor(@Inject(ConfigService) private readonly config: ConfigService) {
    this.openai = new OpenAI({ apiKey: config.get('OPENAI_API_KEY') });
    this.model = config.get('OPENAI_MODEL');
    console.log(this.model + ' init');
    // this.test();
  }

  async test() {
    const messages = [
      {
        role: ROLES.SYSTEM,
        content: 'Ты мудрый старец. Отвечай как будто это живая переписка.',
      },
      {
        role: ROLES.USER,
        content: `Меня зовут Марина. Сегодня ${new Date(
          Date.now(),
        ).toLocaleString()} Пожелай мне хорошего дня. Скажи что нибудь мотивирующее. В конце процитируй асту из черного клевера.`,
      },
    ];
    try {
      console.log(await this.createReqest(messages));
    } catch (error) {
      console.error(error.message);
    }
  }

  async createReqest(messages: any[]) {
    try {
      const chatCompletion = await this.openai.chat.completions.create({
        messages,
        model: this.model,
      });
      return chatCompletion.choices[0].message.content;
    } catch (e) {
      console.error(e);
    }
  }
}
