const TASK_COUNT = 25;

const daysToMSec = (d) => d * 24 * 3600 * 1000;
const getRandomBool = () => [true, false][Math.floor(Math.random() * 2)];

export const createTask = () => ({
  isInEditMode: false,
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: new Date(Date.now() + Math.floor(Math.random() * daysToMSec(15) - daysToMSec(7))),
  repeatingDays: {
    mo: false,
    tu: false,
    we: getRandomBool(),
    th: false,
    fr: false,
    sa: false,
    su: false,
  },
  tags: new Set([
    `homework`, `theory`, `practice`, `intensive`, `keks`
  ].sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 4))),
  color: [
    `black`, `yellow`, `blue`, `green`, `pink`
  ][Math.floor(Math.random() * 5)],
  isFavorite: getRandomBool(),
  isArchive: getRandomBool(),
  get isRepeating() {
    return Object.values(this.repeatingDays).some((v) => v);
  },
});

export const taskList = new Array(TASK_COUNT).fill(``).map(createTask);

taskList[0].isInEditMode = true;

export const filterList = [
  {
    title: `all`,
    get count() {
      return taskList.length;
    }
  },
  {
    title: `overdue`,
    get count() {
      return taskList.filter((t) => t.dueDate < new Date()).length;
    }
  },
  {
    title: `today`,
    get count() {
      return taskList.filter((t) => t.dueDate.toDateString() === new Date().toDateString()).length;
    }
  },
  {
    title: `favorites`,
    get count() {
      return taskList.filter((t) => t.isFavorite).length;
    }
  },
  {
    title: `repeating`,
    get count() {
      return taskList.filter((t) => t.isRepeating).length;
    }
  },
  {
    title: `tags`,
    get count() {
      return taskList.filter((t) => t.tags.size > 0).length;
    }
  },
  {
    title: `archives`,
    get count() {
      return taskList.filter((t) => t.isArchive).length;
    }
  }
];
filterList.current = `all`;
