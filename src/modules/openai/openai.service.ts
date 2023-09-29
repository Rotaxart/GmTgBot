import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class OpenaiService {
  openai: OpenAI;
  model: string;
  constructor(@Inject(ConfigService) private readonly config: ConfigService) {
    this.openai = new OpenAI({ apiKey: config.get('OPENAI_API_KEY') });
    this.model = this.config.get('OPENAI_MODEL');
    console.log(this.model + ' init');
    // this.test();
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
