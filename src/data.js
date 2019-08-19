const TASK_COUNT = 25;

const daysToMSec = (d) => d * 24 * 3600 * 1000;
const getRandom = (n) => Math.floor(Math.random() * n);
const getRandomBool = () => [true, false][getRandom(2)];

export const createTask = () => ({
  isInEditMode: false,
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][getRandom(3)],
  dueDate: Date.now() + getRandom(daysToMSec(15) - daysToMSec(7)),
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
  ].sort(() => Math.random() - 0.5).slice(0, getRandom(4))),
  color: [
    `black`, `yellow`, `blue`, `green`, `pink`
  ][getRandom(5)],
  isFavorite: getRandomBool(),
  isArchive: getRandomBool(),
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
      return taskList.filter((t) => new Date(t.dueDate).toDateString() === new Date().toDateString()).length;
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
