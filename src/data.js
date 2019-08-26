const TASK_COUNT = 15;

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
  dueDate: Date.now() + getRandom(daysToMSec(15)) - getRandom(daysToMSec(7)),
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
  get isRepeating() {
    return Object.values(this.repeatingDays).some((v) => v);
  }
});

export const tasks = new Array(getRandom(TASK_COUNT)).fill(``).map(createTask);

export const filterList = [
  {
    title: `all`,
    get count() {
      return tasks.length;
    }
  },
  {
    title: `overdue`,
    get count() {
      return tasks.filter((t) => t.dueDate < Date.now()).length;
    }
  },
  {
    title: `today`,
    get count() {
      return tasks.filter((t) => new Date(t.dueDate).toDateString() === new Date().toDateString()).length;
    }
  },
  {
    title: `favorites`,
    get count() {
      return tasks.filter((t) => t.isFavorite).length;
    }
  },
  {
    title: `repeating`,
    get count() {
      return tasks.filter((t) => t.isRepeating).length;
    }
  },
  {
    title: `tags`,
    get count() {
      return tasks.filter((t) => t.tags.size > 0).length;
    }
  },
  {
    title: `archives`,
    get count() {
      return tasks.filter((t) => t.isArchive).length;
    }
  }
];

export const sortingMethods = {
  default: {
    title: `SORT BY DEFAULT`,
    sort() {
      return tasks;
    }
  },
  byDateUp: {
    title: `SORT BY DATE up`,
    sort() {
      return tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
    }
  },
  byDateDown: {
    title: `SORT BY DATE down`,
    sort() {
      return tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
    }
  },
};
