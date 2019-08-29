import {replaceComponent, render} from "../utils";
import {TaskItem} from "../components/task-item";
import {TaskEditForm} from "../components/task-edit";

export class TaskController {
  constructor({taskList, task, onDataChange, onChangeView}) {
    this._container = taskList.element;
    this._task = task;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._taskItem = taskList.createOwnedComponent(new TaskItem(task));
    this._taskEditForm = taskList.createOwnedComponent(new TaskEditForm(task));

    this._taskItem.onEdit(() => replaceComponent(this._taskItem, this._taskEditForm));
    this._taskEditForm.onSave(() => replaceComponent(this._taskEditForm, this._taskItem));
    this._taskEditForm.onDismiss(() => replaceComponent(this._taskEditForm, this._taskItem));
  }

  init() {
    render(this._container, this._taskItem);
  }
}
