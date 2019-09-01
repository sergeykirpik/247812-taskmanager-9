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
    this._taskEditForm.onSave((formData) => {
      replaceComponent(this._taskEditForm, this._taskItem);
      const repeat = formData.getAll(`repeat`);
      const date = formData.get(`date`);
      const data = {
        description: formData.get(`text`),
        color: formData.get(`color`),
        tags: new Set(formData.getAll(`hashtag`)),
        dueDate: date === null ? null : new Date(date),
        isArchive: task.isArchive,
        isFavorite: task.isFavorite,
        repeatingDays: Object.keys(task.repeatingDays).reduce((acc, key) => {
          acc[key] = repeat.includes(key);
          return acc;
        }, {}),
      };
      this._onDataChange(this._task, data);
    });
    this._taskEditForm.onDismiss(() => replaceComponent(this._taskEditForm, this._taskItem));
  }

  init() {
    render(this._container, this._taskItem);
  }
}
