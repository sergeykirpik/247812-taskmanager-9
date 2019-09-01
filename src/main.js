import "../node_modules/flatpickr/dist/flatpickr.min.css";

import {Menu} from './components/menu.js';
import {Search} from './components/search.js';
import {BoardController} from './controllers/board-controller.js';

import {mockTasks as tasks} from './data.js';
import {render} from './utils.js';

const mainContainer = document.querySelector(`.main`);
const menuContainer = mainContainer.querySelector(`.main__control`);

render(menuContainer, new Menu());
render(mainContainer, new Search());

const boardController = new BoardController({container: mainContainer, tasks});
boardController.init();


