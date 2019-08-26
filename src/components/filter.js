import {createElement} from '../utils.js';

export class Filter {
  constructor(filterList) {
    this._filterList = filterList;
    this._current = filterList[0].title;
    this._element = null;
  }

  removeElement() {
    this._element = null;
  }

  get element() {
    if (!this._element) {
      return createElement(this.template);
    }
    return this._element;
  }

  get template() {
    return `<section class="main__filter filter container">
      ${this._filterList.map((f) => `<input ${f.count === 0 ? `disabled` : ``}
        type="radio"
        id="filter__${f.title}"
        class="filter__input visually-hidden"
        name="filter"
        ${f.title === this._current ? `checked` : ``}
      />
      <label for="filter__all" class="filter__label">
        ${f.title} <span class="filter__${f.title}-count">${f.count}</span></label
      >`).join(``)}
    </section>`;
  }
}
