import {KeyCode, render, createElement} from "../utils";
import {AbstractComponent} from "./abstract-component";
import flatpickr from "flatpickr";

export class TaskEditForm extends AbstractComponent {
  constructor({description, dueDate, repeatingDays, tags, color, isFavorite, isArchive}) {
    super();
    this._description = description;
    this._dueDate = dueDate;
    this._repeatingDays = repeatingDays;
    this._tags = tags;
    this._color = color;
    this._isFavorite = isFavorite;
    this._isArchive = isArchive;
    this._onDismiss = null;

    this._updateDateStatus(this._dueDate !== null);
    this._updateRepeatStatus(this._isRepeating);

    this.on(document, `keydown`, (evt) => {
      if (evt.keyCode === KeyCode.ESC) {
        this._onDismiss();
      }
    });

    this.on(document, `keydown`, (evt) => {
      if (evt.keyCode === KeyCode.ENTER) {
        evt.preventDefault();
      }
    });

    this.on(this.element.querySelector(`.card__text`), `keydown`, (evt) => {
      evt.stopPropagation();
    });

    this.on(this.element.querySelector(`.card__date-deadline-toggle`), `click`, () => {
      this._updateDateStatus(!this._dateStatus);
      if (this._dateStatus) {
        this._updateRepeatStatus(false);
      }
    });

    this.on(this.element.querySelector(`.card__repeat-toggle`), `click`, () => {
      this._updateRepeatStatus(!this._repeatStatus);
      this.element.classList.toggle(`card--repeat`);
      if (this._repeatStatus) {
        this._updateDateStatus(false);
      }
    });

    const hashtagList = this.element.querySelector(`.card__hashtag-list`);
    this.on(hashtagList, `click`, (evt) => {
      if (evt.target.classList.contains(`card__hashtag-delete`)) {
        evt.target.parentNode.remove();
      }
    });

    const hashtagInput = this.element.querySelector(`.card__hashtag-input`);
    this.on(hashtagInput, `keydown`, (evt) => {
      if (evt.keyCode === KeyCode.ENTER) {
        render(
            hashtagList,
            {element: createElement(this._hashTagComponent(hashtagInput.value))}
        );
        hashtagInput.value = ``;
      }
    });

    this.element.querySelectorAll(`.card__color-input`).forEach((it) => {
      this.on(it, `change`, (evt) => {
        this._color = evt.target.value;
        this.element.className = this._cardClassName;
      });
    });

    flatpickr(this.element.querySelector(`.card__date`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._dueDate === null ? Date.now() : this._dueDate.valueOf(),
    });

  }

  _updateDateStatus(status) {
    this._dateStatus = status;
    const fieldset = this.element.querySelector(`.card__date-deadline`);
    fieldset.disabled = !this._dateStatus;
    const statusElement = this.element.querySelector(`.card__date-status`);
    statusElement.textContent = this._dateStatus ? `yes` : `no`;
  }

  _updateRepeatStatus(status) {
    this._repeatStatus = status;
    const fieldset = this.element.querySelector(`.card__repeat-days`);
    fieldset.disabled = !this._repeatStatus;
    const statusElement = this.element.querySelector(`.card__repeat-status`);
    statusElement.textContent = this._repeatStatus ? `yes` : `no`;
  }

  get _isRepeating() {
    return Object.values(this._repeatingDays).some((v) => v);
  }

  get _cardClassName() {
    return `
      card
      card--edit
      card--${this._color}
      ${this._isRepeating ? `card--repeat` : ``}
    `;
  }

  get _dueDateAsDateString() {
    return !this._dueDate ? `` : this._dueDate.toDateString();
  }

  _hashTagComponent(tag) {
    return `
    <span class="card__hashtag-inner">
      <input type="hidden" name="hashtag" value="${tag}" class="card__hashtag-hidden-input">
      <p class="card__hashtag-name">
        #${tag}
      </p>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    </span>`.trim();
  }

  onSave(action) {
    this.on(this.element.querySelector(`form`), `submit`, (evt) => {
      evt.preventDefault();
      action(new FormData(this.element.querySelector(`form`)));
    });
  }

  onDismiss(action) {
    this._onDismiss = action;
  }

  get template() {
    return `
    <article class="${this._cardClassName}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
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
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${this._description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">no</span>
                </button>

                <fieldset class="card__date-deadline" disabled>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder=""
                      name="date"
                      value="${this._dueDateAsDateString}"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">no</span>
                </button>

                <fieldset class="card__repeat-days" disabled}>
                  <div class="card__repeat-days-inner">
                    ${Object.keys(this._repeatingDays).map((d) => `<input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-${d}-4"
                      name="repeat"
                      value="${d}"
                      ${this._repeatingDays[d] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-${d}-4"
                      >${d}</label
                    >`).join(``)}
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${Array.from(this._tags).map((tag) => this._hashTagComponent(tag)).join(``)}
                </div>

                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${[`black`, `yellow`, `blue`, `green`, `pink`].map((c) => `<input
                  type="radio"
                  id="color-${c}-4"
                  class="card__color-input card__color-input--${c} visually-hidden"
                  name="color"
                  value="${c}"
                  ${c === this._color ? `checked` : ``}
                />
                <label
                  for="color-${c}-4"
                  class="card__color card__color--${c}"
                  >black</label
                >`).join(``)}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`.trim();
  }
}
