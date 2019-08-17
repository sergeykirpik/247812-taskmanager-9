import {getMenuMarkup} from './components/menu.js';
import {getSearchMarkup} from './components/search.js';
import {getFilterMarkup} from './components/filter.js';
import {getEditTaskMarkup} from './components/edit-task.js';
import {getTaskCardMarkup} from './components/task-card.js';
import {getBoardMarkup} from './components/board.js';
import {getSortByMarkup} from './components/sort-by.js';
import {getLoadMoreButtonMarkup} from './components/load-more';

import {taskList} from './data.js';

const LOAD_STEP = 8;

const renderComponent = (container, markup, place) => {
  container.insertAdjacentHTML(place, markup);
};

const mainContainer = document.querySelector(`.main`);
const menuContainer = mainContainer.querySelector(`.main__control`);

renderComponent(menuContainer, getMenuMarkup(), `beforeEnd`);
renderComponent(mainContainer, getSearchMarkup(), `beforeEnd`);
renderComponent(mainContainer, getFilterMarkup(), `beforeEnd`);
renderComponent(mainContainer, getBoardMarkup(), `beforeEnd`);

const boardContainer = mainContainer.querySelector(`.board`);
renderComponent(boardContainer, getSortByMarkup(), `afterBegin`);

const taskContainer = boardContainer.querySelector(`.board__tasks`);

const renderTasks = (lowLimit) => {
  const upperLimit = Math.min(lowLimit + LOAD_STEP - 1, taskList.length) + 1;
  taskList.slice(lowLimit, upperLimit).forEach((t) => {
    const constructor = t.isInEditMode ? getEditTaskMarkup : getTaskCardMarkup;
    renderComponent(taskContainer, constructor(t), `beforeEnd`);
  });
};

let startFrom = 0;
const isAllTasksLoaded = () => startFrom + LOAD_STEP >= taskList.length;

renderTasks(startFrom);
renderComponent(taskContainer, getLoadMoreButtonMarkup(), `afterEnd`);

const loadMoreBtn = boardContainer.querySelector(`.load-more`);
loadMoreBtn.style.display = isAllTasksLoaded() ? `none` : ``;

loadMoreBtn.addEventListener(`click`, () => {
  startFrom += LOAD_STEP;
  renderTasks(startFrom);
  loadMoreBtn.style.display = isAllTasksLoaded() ? `none` : ``;
});
