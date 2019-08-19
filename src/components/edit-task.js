export const getEditTaskMarkup = (t) => {
  return `<article class="card card--edit card--${t.color} 
                          ${t.isRepeating ? `card--repeat` : ``}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--archive
                                       ${t.isArchive ? `` : `card__btn--disabled`}">
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
            >${t.description}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">
                  ${t.dueDate === null ? `no` : `yes`}
                </span>
              </button>

              <fieldset class="card__date-deadline" 
                        ${t.dueDate === null ? `disabled` : ``}>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder=""
                    name="date"
                    value="${t.dueDate.toDateString()}"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">
                  ${t.isRepeating ? `yes` : `no`}
                </span>
              </button>

              <fieldset class="card__repeat-days" 
                        ${t.isRepeating ? `` : `disabled`}>
                <div class="card__repeat-days-inner">
                  ${Object.keys(t.repeatingDays).map((d) => `<input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-${d}-4"
                    name="repeat"
                    value="${t.repeatingDays[d]}"
                    ${t.repeatingDays[d] ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="repeat-${d}-4"
                    >${d}</label
                  >`).join(``)}
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${Array.from(t.tags).map((tag) => `<span class="card__hashtag-inner">
                  <input
                    type="hidden"
                    name="hashtag"
                    value="${tag}"
                    class="card__hashtag-hidden-input"
                  />
                  <p class="card__hashtag-name">
                    #${tag}
                  </p>
                  <button type="button" class="card__hashtag-delete">
                    delete
                  </button>
                </span>`).join(``)}
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
                ${c === t.color ? `checked` : ``}
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
  </article>`;
};
