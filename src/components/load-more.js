import {createElement} from "../utils.js";

export class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  removeElement() {
    this._element = null;
  }

  onClick(action) {
    this.element.addEventListener(`click`, action);
  }

  setVisible(v) {
    this.element.style.display = v ? `` : `none`;
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }
    return this._element;
  }

  get template() {
    return `
      <button class="load-more" type="button">load more</button>
    `.trim();
  }
}
