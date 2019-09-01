import {AbstractComponent} from "./abstract-component";
import {TaskController} from "../controllers/task-controller";

const DEFAULT_LOAD_STEP = 8;

export class TaskList extends AbstractComponent {
  constructor(tasks, onDataChange) {
    super();
    this._alreadyLoaded = 0;
    this._step = DEFAULT_LOAD_STEP;
    this._items = tasks.map((task) => new TaskController({
      taskList: this, task, onDataChange, onChangeView: this.onChangeView.bind(this)
    }));
  }

  onChangeView(taskController) {
    this._items.filter((it) => it !== taskController).forEach((it) => it.onDismiss(it));
  }

  onAllItemsLoaded(action) {
    this._onAllItemsLoaded = action;
  }

  set _allItemsLoaded(val) {
    if (val) {
      this._onAllItemsLoaded();
    }
  }

  get template() {
    return `
    <div class="board__tasks">
      <!-- Task list items -->
    </div>`.trim();
  }

  loadMore() {
    const upperLimit = Math.min(
        this._alreadyLoaded + this._step - 1,
        this._items.length
    ) + 1;
    this._items.slice(this._alreadyLoaded, upperLimit).forEach((it) => it.init());

    this._alreadyLoaded += this._step;
    this._allItemsLoaded = this._alreadyLoaded >= this._items.length;
  }
}
