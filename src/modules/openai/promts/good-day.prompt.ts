import { ROLES } from '../enums/roles.enum';

export const goodDayPrompt = (name = 'Марина') => [
  {
    role: ROLES.SYSTEM,
    content: 'Ты мудрый старец. Отвечай как будто это живая переписка.',
  },
  {
    role: ROLES.USER,
    content: `Меня зовут ${name}. Сегодня ${new Date(
      Date.now(),
    ).toLocaleString()} Пожелай мне хорошего дня. Скажи что нибудь мотивирующее. В конце процитируй асту из черного клевера.`,
  },
];
