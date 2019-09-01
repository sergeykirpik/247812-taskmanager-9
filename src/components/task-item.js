import {AbstractComponent} from "./abstract-component";

export class TaskItem extends AbstractComponent {
  constructor({color, dueDate, isArchive, isFavorite, description, tags, repeatingDays}) {
    super();
    this._color = color;
    this._dueDate = dueDate;
    this._isArchive = isArchive;
    this._isFavorite = isFavorite;
    this._description = description;
    this._tags = tags;
    this._repeatingDays = repeatingDays;
  }

  get _isRepeating() {
    return Object.values(this._repeatingDays).some((v) => v);
  }

  onEdit(action) {
    this.on(this.element.querySelector(`.card__btn--edit`), `click`, action);
  }

  get _cardClass() {
    return `
      card card--${this._color}
      ${this._isRepeating ? `card--repeat` : ``}
      ${this._dueDate && this._dueDate < new Date() ? `card--deadline` : ``}
    `;
  }

  get _dueDateAsDateString() {
    return this._dueDate === null ? `` : this._dueDate.toDateString();
  }

  get _dueDateAsLocaleTimeString() {
    return this._dueDate === null ? `` : this._dueDate.toLocaleTimeString();
  }

  get template() {
    return `
    <article class="${this._cardClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${this._description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${this._dueDateAsDateString}</span>
                    <span class="card__time">${this._dueDateAsLocaleTimeString}</span>
                  </p>
                </div>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${Array.from(this._tags).map((tag) => `<span class="card__hashtag-inner">
                    <span class="card__hashtag-name">
                      #${tag}
                    </span>
                  </span>`).join(``)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`.trim();
  }
}
