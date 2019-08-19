import {filterList} from '../data.js';

export const getFilterMarkup = () => {
  return `<section class="main__filter filter container">
    ${filterList.map((f) => `<input
      type="radio"
      id="filter__${f.title}"
      class="filter__input visually-hidden"
      name="filter"
      ${f.title === filterList.current ? `checked` : ``}
    />
    <label for="filter__all" class="filter__label">
      ${f.title} <span class="filter__${f.title}-count">${f.count}</span></label
    >`).join(``)}

    <input
      type="radio"
      id="filter__tags"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__tags" class="filter__label"
      >Tags <span class="filter__tags-count">1</span></label
    >
    <input
      type="radio"
      id="filter__archive"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__archive" class="filter__label"
      >Archive <span class="filter__archive-count">115</span></label
    >
  </section>`;
};
