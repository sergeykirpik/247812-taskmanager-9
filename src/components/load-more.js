import {AbstractComponent} from "./abstract-component";

export class LoadMoreButton extends AbstractComponent {

  onClick(action) {
    this.on(this.element, `click`, action);
  }

  setVisible(v) {
    this.element.style.display = v ? `` : `none`;
  }

  get template() {
    return `
      <button class="load-more" type="button">load more</button>
    `.trim();
  }
}
