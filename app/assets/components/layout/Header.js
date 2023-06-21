import { DOC } from "../../helpers/reusable_variables.js";

/**
 * @returns The header element.
 */
export function Header() {

  const HEADER = DOC.createElement('header');
  HEADER.classList.add("header");

  HEADER.innerHTML = `
    <a id="menu" class="menu"><img src="app/assets/icons/svg/menu.svg" alt="Menu icon"/></a>
    <h1 class="header__h1"><a href="#/" class="header__a">MASC <span class="header__span">TDList</span></a></h1>
    <div class="main__div">
      <h2 id="list-name" class="main__h2">There are no lists available</h2>
    </div>
  `;

  return HEADER;
}