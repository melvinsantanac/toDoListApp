import { DOC } from "../../helpers/reusable_variables.js";

/**
 * @returns The `footer` element with a form to add tasks into a selected group list in the side bar.
 */
export function Footer() {

  const FOOTER = DOC.createElement("footer");
  FOOTER.classList.add("footer");

  FOOTER.innerHTML = `
    <form id="main-form" class="main__form">
      <input id="main-input" type="text" class="main__input" placeholder="Add task" autocomplete="off"/>
      <button id="main-submit" type="submit" href="#/" class="main__submit"><img src="app/assets/icons/svg/add_task.svg" alt="Add tasks icon"/></button>
    </form>
    <p class="footer__p">Developed by <a href="https://melvinsantana.com" class="footer__a"> Melvin Santana</a></p>
  `;

  return FOOTER;
}
