import {render} from "../utils";
import {TaskList} from "./taks-list";
import {LoadMoreButton} from "./load-more";
import {NoTasks} from "./no-tasks";
import {AbstractComponent} from "./abstract-component";

export class Board extends AbstractComponent {
  constructor({tasks, sortBy, onDataChange}) {
    super();
    this._tasks = tasks;
    this._sortBy = sortBy;
    this._taskList = this.createOwnedComponent(new TaskList(tasks, onDataChange));
    this._loadMore = this.createOwnedComponent(new LoadMoreButton());
    this._noTasks = this.createOwnedComponent(new NoTasks());
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

