import { DOC } from "../../helpers/reusable_variables.js";
import { AsideListClass, MainListClass } from "./ListsClass.js";

export function ListsManager() {
  const
    ASIDE_INPUT = DOC.getElementById("aside-input"),
    ASIDE_SUBMIT = DOC.getElementById("aside-submit"),
    ASIDE_LIST = DOC.getElementById("groups-tasks-list"),
    ASIDE_STORAGE = localStorage.getItem("lists"),
    ASIDE_INITIAL_TEXT = `<span id="aside-empty" class="empty">Add your lists here</span>`,
    NEW_ASIDE_ELEMENT = new AsideListClass("aside-input", "groups-tasks-list", "list__li-aside isActive"),
    LIST_NAME = DOC.getElementById("list-name"),
    MAIN_SUBMIT = DOC.getElementById("main-submit"),
    MAIN_LIST = DOC.getElementById("tasks-list"),
    MAIN_STORAGE = localStorage.getItem(localStorage.getItem("lastListSelected")),
    MAIN_INITIAL_TEXT = `<span id="main-empty" class="empty">No list added in the aside section</span>`,
    NEW_MAIN_ELEMENT = new MainListClass("main-input", "tasks-list", "");

  (() => {
    if (!ASIDE_STORAGE) {
      ASIDE_INPUT.focus();
      ASIDE_LIST.innerHTML = ASIDE_INITIAL_TEXT;
      MAIN_LIST.innerHTML = MAIN_INITIAL_TEXT;
    } else {
      LIST_NAME.innerHTML = localStorage.getItem("lastListSelectedName");
      ASIDE_LIST.innerHTML = ASIDE_STORAGE;
      MAIN_LIST.innerHTML = MAIN_STORAGE;

      setTimeout(() => {
        DOC.getElementsByClassName("isActive").length > 0 ? DOC.querySelector(".isActive").click() : DOC.querySelector(".list__li-aside").click();
      });
    }
  })();

  // Adding element to the aside and main lists
  ASIDE_SUBMIT.addEventListener("click", (e) => {
    e.preventDefault();

    NEW_ASIDE_ELEMENT.addElement();
  });

  MAIN_SUBMIT.addEventListener("click", (e) => {
    e.preventDefault();

    NEW_MAIN_ELEMENT.addElement();
  });

  // Selecting aside list element
  ASIDE_LIST.addEventListener("click", (e) => {
    e.preventDefault();

    NEW_ASIDE_ELEMENT.selectList(e.target);
  });

  MAIN_LIST.addEventListener("click", (e) => {
    e.preventDefault();

    NEW_MAIN_ELEMENT.checkAsCompleted(e.target);
  });

  // Delete lists in the aside and tasks in the main
  ASIDE_LIST.addEventListener("click", (e) => {
    e.preventDefault();

    NEW_ASIDE_ELEMENT.deleteElement(e.target);
  });

  MAIN_LIST.addEventListener("click", (e) => {
    e.preventDefault();

    NEW_MAIN_ELEMENT.deleteElement(e.target);
  });

  // Edit lists in the aside and tasks in the main
  ASIDE_LIST.addEventListener("click", (e) => {
    e.preventDefault();

    NEW_ASIDE_ELEMENT.editElement(e.target, "lists");
  });

  MAIN_LIST.addEventListener("click", (e) => {
    e.preventDefault();

    NEW_MAIN_ELEMENT.editElement(e.target, localStorage.getItem("lastListSelected"));
  });
}