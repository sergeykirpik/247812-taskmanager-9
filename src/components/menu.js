import {AbstractComponent} from "./abstract-component";

export class Menu extends AbstractComponent {
  constructor() {
    super();
    this._menu = {
      [`new-task`]: `+ ADD NEW TASK`,
      task: `TASKS`,
      statistic: `STATISTICS`,
    };
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
