import {createElement} from "../utils";
import {EventManager} from "../event-manager";

export class AbstractComponent extends EventManager {
  constructor() {
    super();
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    this._element = null;
    this._ownedComponents = [];
  }

  _afterElementCreated() {
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
      this._afterElementCreated();
    }
    return this._element;
  }

  createOwnedComponent(component) {
    this._ownedComponents.push(component);
    return component;
  }

  removeElement() {
    this.detachEventHandlers();
    this._ownedComponents.forEach((component) => component.removeElement());
    this._element = null;
  }

  get template() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }
}
