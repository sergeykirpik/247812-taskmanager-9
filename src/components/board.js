import {render} from "../utils";
import {SortBy} from "./sort-by";
import {TaskList} from "./taks-list";
import {LoadMoreButton} from "./load-more";
import {NoTasks} from "./no-tasks";
import {AbstractComponent} from "./abstract-component";

export class Board extends AbstractComponent {
  constructor(tasks, onDataChange) {
    super();
    this._tasks = tasks;
    this._sortBy = this.createOwnedComponent(new SortBy());
    this._taskList = this.createOwnedComponent(new TaskList(tasks, onDataChange));
    this._loadMore = this.createOwnedComponent(new LoadMoreButton());
    this._noTasks = this.createOwnedComponent(new NoTasks());
  }

  get sort() {
    return this._sortBy;
  }

  get loadMoreBtn() {
    return this._loadMore;
  }

  get taskList() {
    return this._taskList;
  }

  _afterElementCreated() {
    if (this._tasks.length > 0) {
      render(this._element, this._sortBy);
      render(this._element, this._taskList);
      render(this._element, this._loadMore);
      this._taskList.loadMore();
    } else {
      render(this._element, this._noTasks);
    }
  }

  get template() {
    return `
    <section class="board container">
      <!-- Sort by list -->
      <!-- Task list -->
      <!-- Load more button -->

      <!-- or -->

      <!-- No tasks -->
    </section>`.trim();
  }
}

