import {Menu} from './components/menu.js';
import {Search} from './components/search.js';
import {Filter} from './components/filter.js';
import {Board} from './components/board.js';

import {tasks, filterList} from './data.js';
import {render} from './utils.js';

const mainContainer = document.querySelector(`.main`);
const menuContainer = mainContainer.querySelector(`.main__control`);

render(menuContainer, new Menu());
render(mainContainer, new Search());
render(mainContainer, new Filter(filterList));
render(mainContainer, new Board(tasks));


