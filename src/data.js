const colorList = [`black`, `yellow`, `blue`, `green`, `pink`];

const getRandomEl = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default {
  isArchive: false,
  isFavorite: false,
  cardColor: getRandomEl(colorList),
  description: `Here is a card with filled data`,
  dueDate: Date.now(),
  hashTagSet: new Set([`repeat`, `cinema`, `entertaiment`]),
  repeatDays: {
    mo: false,
    tu: false,
    we: true,
    th: false,
    fr: false,
    sa: false,
    su: false,
  },
  get hashTagList() {
    return Array.from(this.hashTagSet);
  },
  get dateStatus() {
    return this.dueDate === null ? `no` : `yes`;
  },
  get dateDisabled() {
    return this.dueDate === null ? `disabled` : ``;
  },
  get dateValue() {
    return new Date(this.dueDate).toDateString();
  },
  get repeatStatus() {
    return this.isRepeat ? `yes` : `no`;
  },
  get repeatDisabled() {
    return this.isRepeat ? `` : `disabled`;
  },
  get isRepeat() {
    return Object.values(this.repeatDays).some((v) => v);
  },
  get repeatDayList() {
    return Object.keys(this.repeatDays);
  },
  dayChecked(d) {
    return this.repeatDays[d] ? `checked` : ``;
  },
  get colorList() {
    return colorList;
  },
  colorChecked(c) {
    return c === this.cardColor ? `checked` : ``;
  },
};
