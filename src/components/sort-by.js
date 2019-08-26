import {createElement} from "../utils.js";

export class SortBy {
  constructor() {
    this._element = null;
  }

  removeElement() {
    this._element = null;
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }
    return this._element;
  }

  get template() {
    return `
    <div class="board__filter-list">
      <a href="#" data-sort-by-default class="board__filter">SORT BY DEFAULT</a>
      <a href="#" data-sort-by-date-up class="board__filter">SORT BY DATE up</a>
      <a href="#" data-sort-by-date-down class="board__filter">SORT BY DATE down</a>
    </div>`.trim();
  }
}
