export const renderComponent = (container, markup, place) => {
  container.insertAdjacentHTML(place, markup);
};

export const Position = {
  BEFORE_BEGIN: `beforeBegin`,
  AFTER_BEGIN: `afterBegin`,
  BEFORE_END: `beforeEnd`,
  AFTER_END: `afterEnd`,
}

export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTER_BEGIN:
      container.prepend(element);
      break;
    case Position.BEFORE_END:
      container.append(element);
      break;
    default:
      throw new Error(`Invalid insert position: ${place}`);
      break;
  }
}

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
}

export const createElement = (template) => {
  const div = document.createElement(`div`);
  div.innerHTML = template;
  return div.firstElementChild;
}
