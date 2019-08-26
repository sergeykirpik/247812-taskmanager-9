import {createElement} from '../utils.js';

export class SortBy {
  constructor(sortingMethods) {
    this._sortingMethods = sortingMethods;
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
    return `<div class="board__filter-list">
      ${Object.entries(this._sortingMethods).map(([k, v]) => `
        <a href="#${k}" class="board__filter">${v.title}</a>
      `).join(``)}
    </div>`;
  }
}
