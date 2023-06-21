import { DOC } from "../../helpers/reusable_variables.js";
import { AlertsClass } from "./AlertsClass.js";

export class ListsClass {
  constructor(inputId, listId, elClassesList) {
    this._inputId = inputId;
    this._listId = listId;
    this._elClassesList = elClassesList;
  }

  // SaveElement
  saveElement() {
    if (this._inputId === "aside-input") {
      localStorage.setItem("lists", DOC.getElementById(this._listId).innerHTML)
    }

    if (this._inputId === "main-input") {
      localStorage.setItem(localStorage.getItem("lastListSelected"), DOC.getElementById(this._listId).innerHTML);
    }
  }

  // AddElement
  addElement() {
    const
      INPUT = DOC.getElementById(this._inputId),
      LIST = DOC.getElementById(this._listId),
      LIST_NAME = DOC.getElementById("list-name"),
      MAIN_LIST = DOC.getElementById("tasks-list"),
      MAIN_INPUT = DOC.getElementById("main-input"),
      LIST_LI = DOC.createElement("li"),
      ELEMENT_ID = new Date().getTime();

    LIST_LI.setAttribute("id", ELEMENT_ID);
    LIST_LI.classList = `list__li ${this._elClassesList}`;

    if (!INPUT.value) {
      new AlertsClass("No value has been specified in the input field").warningAlert();

      DOC.getElementById("confirm-ok").addEventListener("click", () => {
        DOC.getElementById("alert-wrapper").remove();
        INPUT.focus();
      });

      return;
    } else if (INPUT.parentElement.id === "main-form" && !localStorage.getItem("lastListSelected")) {
      new AlertsClass("Before adding tasks, you should create a list in the aside menu").warningAlert();
      DOC.getElementById("confirm-ok").addEventListener("click", () => {
        if (window.innerWidth > 700) {
          DOC.getElementById("aside-input").focus();
          DOC.getElementById("alert-wrapper").remove()
        } else {
          DOC.getElementById("menu").click();
          DOC.getElementById("aside-input").focus();
          DOC.getElementById("alert-wrapper").remove()
        }
      });

      return;
    } else {
      LIST_LI.innerHTML = `
      <span>${INPUT.value}</span>
      <div class="list__div">
        <span class="list__span list__span-edit"><img src="./app/assets/icons/svg/edit.svg" alt="Edit task icon"></span>
        <span class="list__span list__span-delete"><img src="./app/assets/icons/svg/delete.svg" alt="Delete task icon"></span>
      </div>
    `;

      LIST.appendChild(LIST_LI);
      INPUT.value = "";

      if (INPUT.id === "aside-input") {
        if (DOC.getElementById("aside-empty")) {
          DOC.getElementById("aside-empty").remove();
        }

        LIST_NAME.innerHTML = LIST_LI.innerText;
        LIST_LI.click();
        MAIN_LIST.innerHTML = `<span id="main-empty" class="empty">Insert your first task into your new pending list using the input in the bottom of the page</span>`;
      } else {
        if (DOC.getElementById("main-empty")) {
          DOC.getElementById("main-empty").remove();
        }
      }
    }

    MAIN_INPUT.focus()
    LIST.scrollTop = window.innerHeight;
    this.saveElement();
  }

  // DeleteElement
  deleteElement(eTarget) {
    if (eTarget.parentElement.classList.contains("list__span-delete")) {
      const
        M_STORAGE = localStorage.getItem("lastListSelected"),
        MAIN_INPUT = DOC.getElementById("main-input"),
        MAIN_LIST = DOC.getElementById("tasks-list"),
        DELETE_ORIGIN = eTarget.parentElement.parentElement.parentElement.parentElement;

      // Deleting task from the main list
      if (!DOC.getElementById("alert-wrapper")) {
        if (DELETE_ORIGIN.id === "tasks-list" && MAIN_LIST.childElementCount === 1) {
          new AlertsClass("You don't have pending tasks in this list, would you like to delete the list?").dangerousAlert();

          DOC.getElementById("confirm-true").addEventListener("click", () => {
            eTarget.parentElement.parentElement.parentElement.remove();

            DOC.getElementById(localStorage.getItem("lastListSelected")).remove();
            MAIN_LIST.innerHTML = `<span id="main-empty" class="empty">The list has been deleted, select or create another list in the aside section</span>`;
            DOC.getElementById("list-name").innerText = `There are no list selected`;
            localStorage.setItem("lists", DOC.getElementById("groups-tasks-list").innerHTML);
            localStorage.removeItem(M_STORAGE);

            DOC.getElementById("alert-wrapper").remove();

            if (DOC.getElementById("groups-tasks-list").childElementCount === 0) {
              DOC.getElementById("list-name").innerText = `There are no lists available`;
              DOC.getElementById("groups-tasks-list").innerHTML = `<span id="aside-empty" class="empty">Add your lists here</span>`;
              MAIN_LIST.innerHTML = `<span id="main-empty" class="empty">No list added in the aside section</span>`;
              DOC.getElementById("aside-input").focus();

              localStorage.clear()
            }
          });

          DOC.getElementById("confirm-false").addEventListener("click", () => {
            eTarget.parentElement.parentElement.parentElement.remove();
            MAIN_LIST.innerHTML = `<span id="main-empty" class="empty">The list is empty, insert tasks using the input in the bottom of the page</span>`;
            MAIN_INPUT.focus();
            localStorage.setItem(M_STORAGE, MAIN_LIST.innerHTML)
            DOC.getElementById("alert-wrapper").remove();
          });

        } else if (DELETE_ORIGIN.id === "tasks-list") {
          new AlertsClass("You are about to delete this task, confirm?").dangerousAlert(eTarget);

          DOC.getElementById("confirm-true").addEventListener("click", () => {
            eTarget.parentElement.parentElement.parentElement.remove();
            localStorage.setItem(M_STORAGE, MAIN_LIST.innerHTML);
            DOC.getElementById("alert-wrapper").remove();
            MAIN_INPUT.focus();
          });

          DOC.getElementById("confirm-false").addEventListener("click", () => {
            MAIN_INPUT.focus();
            DOC.getElementById("alert-wrapper").remove();
          });
        }

        // Deleting list from the aside lis
        if (DELETE_ORIGIN.id === "groups-tasks-list" && eTarget.parentElement.parentElement.parentElement.classList.contains("isActive")) {
          new AlertsClass("You are about to delete this list, confirm?").dangerousAlert(eTarget);

          DOC.getElementById("confirm-true").addEventListener("click", () => {
            eTarget.parentElement.parentElement.parentElement.remove();

            MAIN_LIST.innerHTML = `<span id="main-empty" class="empty">The list has been deleted, select or create another list in the aside section</span>`;
            DOC.getElementById("list-name").innerText = `There are no list selected`;
            localStorage.setItem("lists", DOC.getElementById("groups-tasks-list").innerHTML);
            localStorage.removeItem(M_STORAGE);

            DOC.getElementById("alert-wrapper").remove();

            if (DOC.getElementById("groups-tasks-list").childElementCount === 0) {
              DOC.getElementById("list-name").innerText = `There are no lists available`;
              DOC.getElementById("groups-tasks-list").innerHTML = `<span id="aside-empty" class="empty">Add your lists here</span>`;
              MAIN_LIST.innerHTML = `<span id="main-empty" class="empty">No list added in the aside section</span>`;
              DOC.getElementById("aside-input").focus();

              localStorage.clear()
            }
          });

          DOC.getElementById("confirm-false").addEventListener("click", () => {
            MAIN_INPUT.focus();
            DOC.getElementById("alert-wrapper").remove();
          });
        } else if (DELETE_ORIGIN.id === "groups-tasks-list" && !eTarget.parentElement.parentElement.parentElement.classList.contains("isActive")) {
          new AlertsClass("For security purposes, to delete the list you should select it first").warningAlert();

          DOC.getElementById("confirm-ok").addEventListener("click", () => {
            DOC.getElementById("alert-wrapper").remove();
          });
        }
      }
    }
  }

  // EditElement
  editElement(eTarget, listId) {
    if (eTarget.parentElement.classList.contains("list__span-edit")) {
      const E_TARGET_ANCESTOR = eTarget.parentElement.parentElement.parentElement;

      let isSaved = false;

      if (DOC.getElementById("edit-task")) {
        DOC.getElementById("edit-task").remove();
      }

      const EDIT_TASK = DOC.createElement("div");
      EDIT_TASK.setAttribute("id", "edit-task");
      EDIT_TASK.classList.add("edit-task");

      EDIT_TASK.innerHTML = `
        <input id="edit-input" class="edit-task__input" autocomplete="off" value="${E_TARGET_ANCESTOR.innerText}"/>
        <a href="#" id="save-changes" class="edit-task__btn">Save</a>
      `;

      E_TARGET_ANCESTOR.appendChild(EDIT_TASK);

      const EDIT_INPUT = DOC.getElementById("edit-input");

      setTimeout(() => {
        EDIT_INPUT.select();
      });

      function changeText() {
        if (EDIT_INPUT.value) {
          E_TARGET_ANCESTOR.getElementsByTagName("span")[0].innerText = EDIT_INPUT.value;

          EDIT_TASK.remove();

          if (listId === "lists" && eTarget.parentElement.parentElement.parentElement.classList.contains("isActive")) {
            localStorage.setItem("lists", DOC.getElementById("groups-tasks-list").innerHTML);
            DOC.getElementById("list-name").innerHTML = EDIT_INPUT.value;
          } else {
            localStorage.setItem("lists", DOC.getElementById("groups-tasks-list").innerHTML);
            localStorage.setItem(localStorage.getItem("lastListSelected"), DOC.getElementById("tasks-list").innerHTML)
          }

          isSaved = true;
        }
      }

      DOC.getElementById("save-changes").addEventListener("click", changeText);

      EDIT_INPUT.addEventListener("keyup", (e) => {
        if (e.code === "Enter") {
          changeText()
        }
      });

      EDIT_INPUT.addEventListener("blur", () => {
        setTimeout(() => {
          if (!isSaved && EDIT_INPUT.value) {
            new AlertsClass("You should save the changes. To do so, you can press enter or click the save button").warningAlert();

            DOC.getElementById("confirm-ok").addEventListener("click", () => {
              DOC.getElementById("alert-wrapper").remove();
              EDIT_INPUT.focus();
            });

          } else if (!EDIT_INPUT.value) {
            new AlertsClass("No value has been specified in the input field").warningAlert();

            DOC.getElementById("confirm-ok").addEventListener("click", () => {
              DOC.getElementById("alert-wrapper").remove();
              EDIT_INPUT.focus();
            });
          }
        }, 800);
      });
    }
  }
}

export class AsideListClass extends ListsClass {
  constructor(inputId, listId, elClassesList) {
    super(inputId, listId, elClassesList);
  }

  // Select list
  selectList(eTarget) {
    if (eTarget.classList.contains("list__li")) {
      const MAIN_LIST = DOC.getElementById("tasks-list");
      localStorage.setItem("lastListSelected", eTarget.id);
      localStorage.setItem("lastListSelectedName", eTarget.innerText);
      DOC.getElementById("list-name").innerHTML = localStorage.getItem("lastListSelectedName");

      DOC.querySelector("aside").classList.remove("menu-isActive"); // Se debe cambiar por un toggle class
      DOC.getElementById("menu").classList.remove("menu-isOpened"); // Se debe cambiar por un toggle class

      localStorage.getItem(eTarget.id) ? MAIN_LIST.innerHTML = localStorage.getItem(eTarget.id) : MAIN_LIST.innerHTML = `<span id="main-empty" class="empty">The list is empty, insert tasks using the input in the bottom of the page</span>`;

      if (DOC.querySelector(".isActive")) {
        DOC.querySelector(".isActive").classList.remove("isActive")
        eTarget.classList.add("isActive");
      } else {
        eTarget.classList.add("isActive");
      }

      DOC.getElementById("main-input").focus();

      this.saveElement();
    }
  }
}

export class MainListClass extends ListsClass {
  constructor(inputId, listId, elClassesList) {
    super(inputId, listId, elClassesList);
  }

  // CheckAsCompleted
  checkAsCompleted(eTarget) {
    if (eTarget.classList.contains("list__li")) {
      if (eTarget.classList.contains("isCompleted")) {
        new AlertsClass("Are you sure you want to unmark it as completed?").dangerousAlert(eTarget);
      } else {
        new AlertsClass("Are you sure you want to mark it as completed?").dangerousAlert(eTarget);
      }

      DOC.getElementById("confirm-true").addEventListener("click", () => {
        eTarget.classList.toggle("isCompleted");

        localStorage.setItem(localStorage.getItem("lastListSelected"), DOC.getElementById("tasks-list").innerHTML);
        DOC.getElementById("alert-wrapper").remove();
      });

      DOC.getElementById("confirm-false").addEventListener("click", () => {
        DOC.getElementById("alert-wrapper").remove();
      });
    }
  }
}