const TASK_COUNT = 15;

const daysToMSec = (d) => d * 24 * 3600 * 1000;
const getRandom = (n) => Math.floor(Math.random() * n);
const getRandomBool = () => [true, false][getRandom(2)];

export const createTask = (isRepeating) => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][getRandom(3)],
  dueDate: isRepeating ? null : new Date(Date.now() + getRandom(daysToMSec(15)) - getRandom(daysToMSec(7))),
  repeatingDays: {
    mo: false,
    tu: false,
    we: isRepeating,
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

export const mockTasks = new Array(getRandom(TASK_COUNT)).fill(``)
                               .map(() => createTask(getRandomBool()));

export const getFilterList = (tasks) => Object.keys(FilterType).map((it) => ({
  title: it,
  get count() {
    return FilterType[it](tasks).length;
  }
}));

export const SortType = {
  default: (tasks) => tasks,
  dateUp: (tasks) => tasks.slice().sort((a, b) => a.dueDate - b.dueDate),
  dateDown: (tasks) => tasks.slice().sort((a, b) => b.dueDate - a.dueDate),
};

export const FilterType = {
  all: (tasks) => tasks.filter((t) => !t.isArchive),
  overdue: (tasks) => tasks
      .filter((t) => !t.isArchive)
      .filter((t) => t.dueDate !== null)
      .filter((t) => t.dueDate.valueOf() < Date.now()),
  today: (tasks) => tasks
      .filter((t) => !t.isArchive)
      .filter((t) => t.dueDate !== null)
      .filter((t) => t.dueDate.toDateString() === new Date().toDateString()),
  favorites: (tasks) => tasks
      .filter((t) => !t.isArchive)
      .filter((t) => t.isFavorite),
  repeating: (tasks) => tasks
      .filter((t) => !t.isArchive)
      .filter((t) => t.dueDate === null),
  tags: (tasks) => tasks
      .filter((t) => !t.isArchive)
      .filter((t) => t.tags.size > 0),
  archives: (tasks) => tasks.filter((t) => t.isArchive),
};
