import { Context } from 'telegraf';
import { State } from '../enums/states.enum';

export class TelegrafContext extends Context {
  session: {
    state: string | State;
  };
}
