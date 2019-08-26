export const renderTemplate = (container, markup, place) => {
  container.insertAdjacentHTML(place, markup);
};

export const Position = {
  BEFORE_BEGIN: `beforeBegin`,
  AFTER_BEGIN: `afterBegin`,
  BEFORE_END: `beforeEnd`,
  AFTER_END: `afterEnd`,
};

export const render = (container, component, place) => {
  if (!(component instanceof HTMLElement)) {
    component = component.element;
  }
  switch (place) {
    case Position.BEFORE_BEGIN:
    case Position.AFTER_BEGIN:
    case Position.BEFORE_END:
    case Position.AFTER_END:
      container.insertAdjacentElement(place, component);
      break;
    default:
      throw new Error(`Invalid insertion position: ${place}`);
  }
};

export const unrender = (component) => {
  if (component) {
    component.element.remove();
    component.removeElement();
  }
};

export const createElement = (template) => {
  const div = document.createElement(`div`);
  div.innerHTML = template;
  return div.firstElementChild;
};
