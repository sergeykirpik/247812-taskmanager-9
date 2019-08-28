
export class EventManager {
  constructor() {
    this._events = [];
  }

  on(element, eventType, handler) {
    this._events.push({element, eventType, handler});
  }

  attachEventHandlers() {
    this._events.forEach(({element, eventType, handler}) => {
      element.addEventListener(eventType, handler);
    });
  }

  detachEventHandlers() {
    this._events.forEach(({element, eventType, handler}) => {
      element.removeEventListener(eventType, handler);
    });
  }
}
