import {createElement} from "../utils.js";

export class Menu {
  constructor() {
    this._menu = {
      [`new-task`]: `+ ADD NEW TASK`,
      task: `TASKS`,
      statistic: `STATISTICS`,
    };
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
    <section class="control__btn-wrap">
      ${Object.entries(this._menu).map(([k, v]) => `<input
        type="radio"
        name="control"
        id="control__${k}"
        class="control__input visually-hidden"
      />
      <label for="control__${k}" class="control__label control__label--${k}"
        >${v}</label
      >`).join(``)}
    </section>`.trim();
  }
}
