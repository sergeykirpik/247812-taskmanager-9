import {render, Position} from './utils.js';

export class TaskLoader {
  constructor({taskList, taskContainer, taskFactory}) {
    this._taskList = taskList;
    this._container = taskContainer;
    this._alreadyLoaded = 0;
    this._step = 8;
    this._taskFactory = taskFactory;
  }
  load() {
    if (this.isAllLoaded) {
      return false;
    }
    const upperLimit = Math.min(
        this._alreadyLoaded + this._step - 1,
        this._taskList.length
    ) + 1;
    this._taskList.slice(this._alreadyLoaded, upperLimit).forEach((it) =>
      render(this._container,
          this._taskFactory(it),
          Position.BEFORE_END));

    this._alreadyLoaded += this._step;
    return !this.isAllLoaded;
  }

  get isAllLoaded() {
    return this._alreadyLoaded >= this._taskList.length;
  }
}
