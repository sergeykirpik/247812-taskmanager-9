import {render} from "../utils";
import {SortBy} from "./sort-by";
import {TaskList} from "./taks-list";
import {LoadMoreButton} from "./load-more";
import {NoTasks} from "./no-tasks";
import {AbstractComponent} from "./abstract-component";

export class Board extends AbstractComponent {
  constructor(tasks) {
    super();
    this._tasks = tasks;
    this._sortBy = new SortBy();
    this._taskList = new TaskList(tasks);
    this._loadMore = new LoadMoreButton();
    this._noTasks = new NoTasks();
    this._loadMore.onClick(() => this._taskList.loadMore());
    this._taskList.onAllItemsLoaded(() => this._loadMore.setVisible(false));
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

  _beforeElementRemoved() {
    this._sortBy.removeElement();
    this._taskList.removeElement();
    this._loadMore.removeElement();
    this._noTasks.removeElement();
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

