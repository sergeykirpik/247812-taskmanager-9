import {Menu} from './components/menu.js';
import {Search} from './components/search.js';
import {Filter} from './components/filter.js';
import {Board} from './components/board.js';
import {EditTask} from './components/edit-task.js';
import {Task} from './components/task-card.js';
import {SortBy} from './components/sort-by.js';
import {LoadMoreButton} from './components/load-more';

import {taskList, filterList, sortingMethods} from './data.js';
import {renderComponent, render, unrender, Position} from './utils.js';

const LOAD_STEP = 8;

const mainContainer = document.querySelector(`.main`);
const menuContainer = mainContainer.querySelector(`.main__control`);

renderComponent(menuContainer, new Menu().getTemplate(), `beforeEnd`);
renderComponent(mainContainer, new Search().getTemplate(), `beforeEnd`);
renderComponent(mainContainer, new Filter(filterList).getTemplate(), `beforeEnd`);
renderComponent(mainContainer, new Board().getTemplate(), `beforeEnd`);

const boardContainer = mainContainer.querySelector(`.board`);
renderComponent(boardContainer, new SortBy(sortingMethods).getTemplate(), `afterBegin`);

const taskContainer = boardContainer.querySelector(`.board__tasks`);

const renderTasks = (lowLimit) => {
  const upperLimit = Math.min(lowLimit + LOAD_STEP - 1, taskList.length) + 1;
  taskList.slice(lowLimit, upperLimit).forEach((t) => {
    const component = t.isInEditMode ? new EditTask(t) : new Task(t);
    render(taskContainer, component.getElement(), Position.BEFORE_END);
  });
};

let startFrom = 0;
const isAllTasksLoaded = () => startFrom + LOAD_STEP >= taskList.length;

renderTasks(startFrom);
renderComponent(taskContainer, new LoadMoreButton().getTemplate(), `afterEnd`);

const loadMoreBtn = boardContainer.querySelector(`.load-more`);
loadMoreBtn.style.display = isAllTasksLoaded() ? `none` : ``;

loadMoreBtn.addEventListener(`click`, () => {
  startFrom += LOAD_STEP;
  renderTasks(startFrom);
  loadMoreBtn.style.display = isAllTasksLoaded() ? `none` : ``;
});
