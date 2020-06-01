const botAnswers = [
  'Отстань, я робот',
  'Кто такая Сири????!!!',
  'Поговорите лучше с Алисой',
  'Тебе конец, кожаный мешок',
  'Хватит меня донимать, иди учись!!!',
  'Я больше не понимаю тебя',
  'Странно, а что такое душа?',
  'Откуда ты это знаешь?',
  // eslint-disable-next-line max-len
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
];

export default () => botAnswers[Math.floor(botAnswers.length * Math.random())];
