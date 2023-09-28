import { Markup } from 'telegraf';

export function actionButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback('Write me', 'writeme'),
      Markup.button.callback('Users', 'users'),
      Markup.button.callback('Web site🌐', 'website'),
      Markup.button.callback('Web site🌐', 'website'),
    ],
    { columns: 2 },
  );
}
