import {createElement} from '../utils.js';

export class Board {
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
    return `<section class="board container">

      <!-- Sort by list -->
      <div class="board__tasks">
      </div>

    </section>`;
  }
}

