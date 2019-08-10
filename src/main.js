import {getMenuMarkup} from './components/menu.js';
import {getSearchMarkup} from './components/search.js';
import {getFilterMarkup} from './components/filter.js';
import {getEditTaskMarkup} from './components/edit-task.js';
import {getTaskCardMarkup} from './components/task-card.js';
import {getBoardMarkup} from './components/board.js';
import {getSortByMarkup} from './components/sort-by.js';
import {getLoadMoreButtonMarkup} from './components/load-more';

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
renderComponent(taskContainer, getEditTaskMarkup(), `beforeEnd`);

for (let i = 1; i <= 3; i++) {
  renderComponent(taskContainer, getTaskCardMarkup(), `beforeEnd`);
}

renderComponent(taskContainer, getLoadMoreButtonMarkup(), `afterEnd`);
