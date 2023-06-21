import { DOC } from "../../helpers/reusable_variables.js";

/**
 * @returns an HTML element (`ASIDE`) that contains a form to add groups of tasks lists
 */
export function Aside() {

  const ASIDE = DOC.createElement("aside");
  ASIDE.classList.add("aside");

  ASIDE.innerHTML = `
    <form id="aside-form" class="aside__form">
      <input id="aside-input" type="text" class="aside__input" placeholder="Add list" autocomplete="off"/>
      <button id="aside-submit" type="submit" class="aside__submit"><img src="app/assets/icons/svg/add_task.svg" alt="Add tasks icon"/></button>
    </form>

    <ul id="groups-tasks-list" class="list"></ul>
  `;

  return ASIDE;
}