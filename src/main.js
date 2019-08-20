import {Menu} from './components/menu.js';
import {Search} from './components/search.js';
import {Filter} from './components/filter.js';
import {Board} from './components/board.js';
import {SortBy} from './components/sort-by.js';
import {LoadMoreButton} from './components/load-more.js';
import {Task} from './components/task-card.js';
import {EditTask} from './components/edit-task.js';

import {taskList, filterList, sortingMethods} from './data.js';
import {render, Position} from './utils.js';

import {TaskLoader} from './task-loader.js';

const mainContainer = document.querySelector(`.main`);
const menuContainer = mainContainer.querySelector(`.main__control`);

render(menuContainer, new Menu(), Position.BEFORE_END);
render(mainContainer, new Search(), Position.BEFORE_END);
render(mainContainer, new Filter(filterList), Position.BEFORE_END);

const board = new Board();
render(mainContainer, board, Position.BEFORE_END);
render(board.element, new SortBy(sortingMethods), Position.AFTER_BEGIN);

const taskContainer = board.element.querySelector(`.board__tasks`);

const taskLoader = new TaskLoader({
  taskList, taskContainer,
  taskFactory: (t) => {
    const task = new Task(t);
    const editTask = new EditTask(t);

    task.element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        task.element.parentNode.replaceChild(editTask.element, task.element);
      });
    editTask.element.querySelector(`form`)
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        editTask.element.parentNode.replaceChild(task.element, editTask.element);
      });
    return task;
  }
});
taskLoader.load();

const loadMoreBtn = new LoadMoreButton();
render(taskContainer, loadMoreBtn, Position.AFTER_END);

loadMoreBtn.visible = !taskLoader.isAllLoaded;

loadMoreBtn.onClick(() => {
  loadMoreBtn.visible = taskLoader.load();
});

