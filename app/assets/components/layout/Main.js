import { DOC } from "../../helpers/reusable_variables.js";
import { MainList } from "../functional/MainList.js";

/**
 * @returns The main element of the application.
 */
export function Main() {

  const MAIN = DOC.createElement("main");
  MAIN.setAttribute("id", "main")
  MAIN.classList.add("main");

  MAIN.appendChild(MainList());

  return MAIN;
}