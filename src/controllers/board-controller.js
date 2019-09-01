import {Board} from "../components/board";
import {render, unrender} from "../utils";
import {SortBy} from "../components/sort-by";
import {Filter} from "../components/filter";

import {FilterType, SortType, getFilterList} from "../data";

export class BoardController {
  constructor({container, tasks}) {
    this._container = container;
    this._tasks = tasks;
    this._sortBy = new SortBy(this.onSort.bind(this));
    this._currentFilter = `all`;
    this._currentSort = `default`;

    render(container, new Filter(getFilterList(tasks), this.onFilter.bind(this)));

  }

  onDataChange(task, data) {
    // console.log(task);
    // console.log(data);
    const index = this._tasks.findIndex((it) => it === task);
    this._tasks[index] = Object.assign(task, data);
    this._renderBoard();
  }

  onFilter(filterType) {
    this._currentFilter = filterType;
    this.init();
  }

  onSort(sortType) {
    this._currentSort = sortType;
    this.init();
  }

  get _filteredTasks() {
    return FilterType[this._currentFilter](this._tasks);
  }

  get _sortedTasks() {
    return SortType[this._currentSort](this._filteredTasks);
  }

  _renderBoard() {
    unrender(this._board);

    this._board = new Board({
      sortBy: this._sortBy,
      tasks: this._sortedTasks,
      onDataChange: this.onDataChange.bind(this),
      onDataSort: this.onSort.bind(this),
    });

    this._board.loadMoreBtn.onClick(() => this._board.taskList.loadMore());
    this._board.taskList.onAllItemsLoaded(() => this._board.loadMoreBtn.setVisible(false));
    render(this._container, this._board);
  }

  init() {
    this._renderBoard();
  }
}


