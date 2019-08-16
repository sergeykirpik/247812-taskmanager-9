import t from '../data.js';

export const getEditTaskMarkup = () => {
  return `<article class="card card--edit card--${t.cardColor} 
                          ${t.isRepeat ? `card--repeat` : ``}">
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
                date: <span class="card__date-status">${t.dateStatus}</span>
              </button>

              <fieldset class="card__date-deadline" ${t.dateDisabled}>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder=""
                    name="date"
                    value="${t.dateValue}"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${t.repeatStatus}</span>
              </button>

              <fieldset class="card__repeat-days" ${t.repeatDisabled}>
                <div class="card__repeat-days-inner">
                  ${t.repeatDayList.map((d) => `<input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-${d}-4"
                    name="repeat"
                    value="${t.repeatDays[d]}"
                    ${t.dayChecked(d)}
                  />
                  <label class="card__repeat-day" for="repeat-${d}-4"
                    >${d}</label
                  >`).join(``)}
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${t.hashTagList.map((hashTag) => `<span class="card__hashtag-inner">
                  <input
                    type="hidden"
                    name="hashtag"
                    value="${hashTag}"
                    class="card__hashtag-hidden-input"
                  />
                  <p class="card__hashtag-name">
                    #${hashTag}
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
              ${t.colorList.map((c) => `<input
                type="radio"
                id="color-${c}-4"
                class="card__color-input card__color-input--${c} visually-hidden"
                name="color"
                value="${c}"
                ${t.colorChecked(c)}
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
