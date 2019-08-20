export class SortBy {
  constructor(sortingMethods) {
    this._sortingMethods = sortingMethods;
  }
  getTemplate() {
    return `<div class="board__filter-list">
      ${Object.entries(this._sortingMethods).map(([k, v]) => `
        <a href="#${k}" class="board__filter">${v.title}</a>
      `).join(``)}
    </div>`;
  }
}
