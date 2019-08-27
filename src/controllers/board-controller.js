import {Board} from "../components/board";
import {render} from "../utils";

export class BoardController {
  constructor({container, tasks}) {
    this._container = container;
    this._board = new Board(tasks);
  }

  init() {
    this._board.loadMoreBtn.onClick(() => this._board.taskList.loadMore());
    this._board.taskList.onAllItemsLoaded(() => this._board.loadMoreBtn.setVisible(false));
    render(this._container, this._board);
  }
}
