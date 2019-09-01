import {AbstractComponent} from "./abstract-component";

export class SortBy extends AbstractComponent {
  constructor(onSort) {
    super();
    this._onSort = onSort || (() => {});
    this.on(this.element, `click`, (evt) => {
      evt.preventDefault();
      const sortType = evt.target.dataset.sortType;
      if (sortType) {
        this._onSort(sortType);
      }
    });
  }

  get template() {
    return `
    <div class="board__filter-list">
      <a href="#" data-sort-type="default" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" data-sort-type="dateUp" class="board__filter">SORT BY DATE up</a>
      <a href="#" data-sort-type="dateDown" class="board__filter">SORT BY DATE down</a>
    </div>`.trim();
  }
}
