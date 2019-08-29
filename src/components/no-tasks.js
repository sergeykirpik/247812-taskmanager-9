import {AbstractComponent} from "./abstract-component";

export class NoTasks extends AbstractComponent {

  get template() {
    return `
    <p class="board__no-tasks">
      Congratulations, all tasks were completed! To create a new click on
      «add new task» button.
    </p>`.trim();
  }
}
