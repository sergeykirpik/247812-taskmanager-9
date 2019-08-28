import {EventManager} from "./event-manager";

export const KeyCode = {
  ESC: 27,
};

export const Position = {
  BEFORE_BEGIN: `beforeBegin`,
  AFTER_BEGIN: `afterBegin`,
  BEFORE_END: `beforeEnd`,
  AFTER_END: `afterEnd`,
};

export const render = (container, component, place = Position.BEFORE_END) => {
  switch (place) {
    case Position.BEFORE_BEGIN:
    case Position.AFTER_BEGIN:
    case Position.BEFORE_END:
    case Position.AFTER_END:
      container.insertAdjacentElement(place, component.element);
      break;
    default:
      throw new Error(`Invalid insertion position: ${place}`);
  }
  _attachEventHandlers(component);
};

export const unrender = (component) => {
  if (component) {
    _detachEventHandlers(component);
    component.element.remove();
    component.removeElement();
  }
};

export const createElement = (template) => {
  const div = document.createElement(`div`);
  div.innerHTML = template;
  return div.firstElementChild;
};

export const replaceComponent = (oldComponent, newComponent) => {
  oldComponent.element.parentNode.replaceChild(newComponent.element, oldComponent.element);
  _detachEventHandlers(oldComponent);
  _attachEventHandlers(newComponent);
};

const _attachEventHandlers = (component) => {
  if (component instanceof EventManager) {
    component.attachEventHandlers();
  }
}

const _detachEventHandlers = (component) => {
  if (component instanceof EventManager) {
    component.detachEventHandlers()
  }
}
