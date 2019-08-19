export class Task {
  constructor({color, repeatingDays, dueDate, isArchive, isFavorite, description, tags}) {
    this.color = color;
    this.repeatingDays = repeatingDays;
    this.dueDate = new Date(dueDate);
    this.isArchive = isArchive;
    this.isFavorite = isFavorite;
    this.description = description;
    this.tags = tags;
  }
  get repeatClass() {
    return this.isRepeating ? `card--repeat` : ``;
  }
  get deadlineClass() {
    return this.dueDate < new Date() ? `card--deadline` : ``;
  }
  get isRepeating() {
    return Object.values(this.repeatingDays).some((v) => v);
  }
  getTemplate() {
    return `<article class="card card--${this.color} ${this.repeatClass} ${this.deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive
                                        ${this.isArchive ? `card__btn--disabled` : ``}">
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
            <p class="card__text">${this.description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${this.dueDate.toDateString()}</span>
                    <span class="card__time">${this.dueDate.toLocaleTimeString()}</span>
                  </p>
                </div>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${Array.from(this.tags).map((tag) => `<span class="card__hashtag-inner">
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
    </article>`;
  }
}
