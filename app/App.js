import { APP, DOC } from "./assets/helpers/reusable_variables.js";
import { Header } from "./assets/components/layout/Header.js";
import { Main } from "./assets/components/layout/Main.js";
import { Aside } from "./assets/components/layout/Aside.js";
import { ListsManager } from "./assets/components/functional/ListsManager.js";

/**
 * The App function sets up the structure of the web page by appending the header and main content, and then calls the tasks manager function.
 */
export function App() {

  APP.appendChild(Aside());
  APP.appendChild(Header());
  APP.appendChild(Main());

  DOC.getElementById("menu").addEventListener("click", () => {
    DOC.querySelector("aside").classList.toggle("menu-isActive");
    DOC.getElementById("menu").classList.toggle("menu-isOpened");
  });

  ListsManager();
}