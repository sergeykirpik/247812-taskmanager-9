const task = {
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: new Date(Date.now() + (Math.floor(Math.random() * 14) - 7) * 24 * 3600 * 1000),
  repeatingDays: {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false,
  },
  tags: Set([
    `homework`, `theory`, `practice`, `intensive`, `keks`
  ].sort(() => Math.random - 0.5).slice(Math.floor(Math.random() * 6))),
  color: [
    `black`, `yellow`, `blue`, `green`, `pink`
  ][Math.floor(Math.random() * 5)],
  isFavourite: false,
  isArchive: false,
};
