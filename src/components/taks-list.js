import {render, replaceComponent} from "../utils";
import {TaskItem} from "./task-item";
import {TaskEditForm} from "./task-edit";
import {AbstractComponent} from "./abstract-component";

const DEFAULT_LOAD_STEP = 8;

export class TaskList extends AbstractComponent {
  constructor(tasks) {
    super();
    this._alreadyLoaded = 0;
    this._step = DEFAULT_LOAD_STEP;
    this._items = tasks.map((task) => this._createItem(task));
  }

  _createItem(task) {
    const taskItem = new TaskItem(task);
    const taskEditForm = new TaskEditForm(task);
    taskItem.onEdit(() => replaceComponent(taskItem, taskEditForm));
    taskEditForm.onSave(() => replaceComponent(taskEditForm, taskItem));
    taskEditForm.onDismiss(() => replaceComponent(taskEditForm, taskItem));
    return taskItem;
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
    this._items.slice(this._alreadyLoaded, upperLimit).forEach((it) =>
      render(this._element, it));

    this._alreadyLoaded += this._step;
    this._allItemsLoaded = this._alreadyLoaded >= this._items.length;
  }
}
