import {replaceComponent, render} from "../utils";
import {TaskItem} from "../components/task-item";
import {TaskEditForm} from "../components/task-edit";

export class TaskController {
  constructor({taskList, task, onDataChange, onChangeView}) {
    this._container = taskList.element;
    this._task = task;
    this._taskList = taskList;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._taskItem = taskList.createOwnedComponent(new TaskItem(task));
    this._taskEditForm = null;

    this._taskItem.onEdit(() => {
      this._onChangeView(this);
      this._taskEditForm = taskList.createOwnedComponent(new TaskEditForm(task));
      this._taskEditForm.onSave(this.onSave.bind(this));
      this._taskEditForm.onDismiss(this.onDismiss.bind(this));
      replaceComponent(this._taskItem, this._taskEditForm);
    });
    this._taskItem.onArchive((isArchive) => {
      this._onDataChange(task, {isArchive});
    });
    this._taskItem.onFavorites((isFavorite) => {
      this._onDataChange(task, {isFavorite});
    });
  }

  onDismiss() {
    if (this._taskEditForm) {
      replaceComponent(this._taskEditForm, this._taskItem);
      this._taskEditForm = null;
    }
  }

  onSave(formData) {
    replaceComponent(this._taskEditForm, this._taskItem);
    const repeat = formData.getAll(`repeat`);
    const date = formData.get(`date`);
    const data = {
      description: formData.get(`text`),
      color: formData.get(`color`),
      tags: new Set(formData.getAll(`hashtag`)),
      dueDate: date === null ? null : new Date(date),
      isArchive: formData.get(`isArchive`) === `true`,
      isFavorite: formData.get(`isFavorite`) === `true`,
      repeatingDays: Object.keys(this._task.repeatingDays).reduce((acc, key) => {
        acc[key] = repeat.includes(key);
        return acc;
      }, {}),
    };
    this._onDataChange(this._task, data);
  }

  init() {
    render(this._container, this._taskItem);
  }
}
