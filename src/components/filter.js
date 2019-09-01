import {AbstractComponent} from "./abstract-component";

export class Filter extends AbstractComponent {
  constructor(filterList, onFilter) {
    super();
    this._filterList = filterList;
    this._current = filterList[0].title;
    this._onFilter = onFilter || (() => {});

    this.on(this.element, `change`, (evt) => {
      const filterType = evt.target.dataset.filterType;
      if (filterType) {
        this._onFilter(filterType);
      }
    });
  }

  get template() {
    return `
    <section class="main__filter filter container">
      ${this._filterList.map((f) => `<input ${f.count === 0 ? `disabled` : ``}
        type="radio"
        id="filter__${f.title}"
        class="filter__input visually-hidden"
        name="filter"
        ${f.title === this._current ? `checked` : ``}
        data-filter-type="${f.title}"
      />
      <label for="filter__${f.title}" class="filter__label">
        ${f.title} <span class="filter__${f.title}-count">${f.count}</span></label
      >`).join(``)}
    </section>`.trim();
  }
}
