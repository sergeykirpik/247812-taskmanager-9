import {AbstractComponent} from "./abstract-component";

export class SortBy extends AbstractComponent {
  get template() {
    return `
    <div class="board__filter-list">
      <a href="#" data-sort-by-default class="board__filter">SORT BY DEFAULT</a>
      <a href="#" data-sort-by-date-up class="board__filter">SORT BY DATE up</a>
      <a href="#" data-sort-by-date-down class="board__filter">SORT BY DATE down</a>
    </div>`.trim();
  }
}
