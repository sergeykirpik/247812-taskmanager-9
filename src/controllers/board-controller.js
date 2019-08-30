import {Board} from "../components/board";
import {render, unrender} from "../utils";

export class BoardController {
  constructor({container, tasks}) {
    this._container = container;
    this._tasks = tasks;
    this._currentSort = `sortByDefault`;
  }

  onDataChange(task, data) {
    // console.log(task);
    const index = this._tasks.findIndex((it) => it === task);
    this._tasks[index] = Object.assign(task, data);
    this._renderBoard();
  }

  get _sortedTasks() {
    return sortBy[this._currentSort](this._tasks);
  }

  _renderBoard() {
    unrender(this._board);
    this._board = new Board(this._sortedTasks, this.onDataChange.bind(this));

    this._board.loadMoreBtn.onClick(() => this._board.taskList.loadMore());
    this._board.taskList.onAllItemsLoaded(() => this._board.loadMoreBtn.setVisible(false));

    this._board.sort.onSort((method) => {
      this._currentSort = method;
      this.init();
    });

    render(this._container, this._board);
  }

  init() {
    this._renderBoard();
  }
}

const sortBy = {
  sortByDefault: (tasks) => tasks,
  sortByDateUp: (tasks) => tasks.slice().sort((a, b) => a.dueDate - b.dueDate),
  sortByDateDown: (tasks) => tasks.slice().sort((a, b) => b.dueDate - a.dueDate),
};
