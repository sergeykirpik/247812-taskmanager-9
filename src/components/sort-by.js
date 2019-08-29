import {AbstractComponent} from "./abstract-component";

export class SortBy extends AbstractComponent {
  constructor() {
    super();
    this._onSort = () => {};
    this.on(this.element, `click`, (evt) => {
      evt.preventDefault();
      const sortMethod = evt.target.dataset.sortMethod;
      if (sortMethod) {
        this._onSort(sortMethod);
      }
    });
  }

  onSort(handler) {
    this._onSort = handler;
  }

  get template() {
    return `
    <div class="board__filter-list">
      <a href="#" data-sort-method="sortByDefault" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" data-sort-method="sortByDateUp" class="board__filter">SORT BY DATE up</a>
      <a href="#" data-sort-method="sortByDateDown" class="board__filter">SORT BY DATE down</a>
    </div>`.trim();
  }
}
