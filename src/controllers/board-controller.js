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

    const filter = new Filter(
        getFilterList(this._tasks),
        this._currentFilter,
        this.onFilter.bind(this)
    );

    this._board = new Board({
      filter,
      sortBy: this._sortBy,
      tasks: this._sortedTasks,
      onDataChange: this.onDataChange.bind(this),
    });
    this._board.createOwnedComponent(filter);

    this._board.loadMoreBtn.onClick(() => this._board.taskList.loadMore());
    this._board.taskList.onAllItemsLoaded(() => this._board.loadMoreBtn.setVisible(false));

    render(this._container, this._board);
  }

  init() {
    this._renderBoard();
  }
}


