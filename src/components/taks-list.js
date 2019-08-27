import {createElement, render, replaceComponent} from "../utils";
import {TaskItem} from "./task-item";
import {TaskEditForm} from "./task-edit";

const DEFAULT_LOAD_STEP = 8;

export class TaskList {
  constructor(tasks) {
    this._alreadyLoaded = 0;
    this._step = DEFAULT_LOAD_STEP;
    this._element = null;
    this._items = tasks.map((task) => this._createItem(task));
  }

  _createItem(task) {
    const taskItem = new TaskItem(task);
    const taskEditForm = new TaskEditForm(task);
    taskItem.onEdit(() => {
      replaceComponent(taskItem, taskEditForm);
      taskEditForm.activateListeners();
    });
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

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }
    return this._element;
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
