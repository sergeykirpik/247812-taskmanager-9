import {Board} from "../components/board";
import {render, unrender} from "../utils";

export class BoardController {
  constructor({container, tasks}) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board(tasks);
  }

  init() {
    const board = this._board;
    board.loadMoreBtn.onClick(() => board.taskList.loadMore());
    board.taskList.onAllItemsLoaded(() => board.loadMoreBtn.setVisible(false));
    render(this._container, board);

    board.sort.onSort((method) => {
      const sortedTasks = sortingMethods[method](this._tasks);
      unrender(this._board);
      this._board = new Board(sortedTasks);
      this.init();
    });

  }
}

const sortingMethods = {
  sortByDefault: (tasks) => tasks,
  sortByDateUp: (tasks) => tasks.slice().sort((a, b) => a.dueDate - b.dueDate),
  sortByDateDown: (tasks) => tasks.slice().sort((a, b) => b.dueDate - a.dueDate),
};
