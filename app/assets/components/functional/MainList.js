import { SECTION } from "../../helpers/reusable_variables.js";
import { Footer } from "../layout/Footer.js";

/**
 * @returns The function creates and returns a main task list section with a div for tasks and a footer.
 */
export function MainList() {

  SECTION.setAttribute("id", "main-tasksList")
  SECTION.classList.add("main__tasksList");

  SECTION.innerHTML = `    
    <ul id="tasks-list" class="list list-main"></ul>
  `;
  SECTION.appendChild(Footer())
  return SECTION;
}