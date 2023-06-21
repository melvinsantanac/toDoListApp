import { DOC } from "../../helpers/reusable_variables.js";

export class AlertsClass {
  constructor(alertMessage) {
    this._alertMessage = alertMessage;
  }

  warningAlert() {
    const ALERT = DOC.createElement("div");
    ALERT.setAttribute("id", "alert-wrapper");
    ALERT.classList.add("alert-wrapper");

    ALERT.innerHTML = `
      <div class="alert confirm warningAlert">
        <p>${this._alertMessage}</p>
        <div class="action-btnGroup">
          <button id="confirm-ok" type="submit" class="confirm-btn confirm-true">Ok</button>
        </div>
      </div>
    `;

    DOC.getElementById("main").appendChild(ALERT);
    DOC.getElementById("confirm-ok").focus();
  }

  dangerousAlert() {
    const ALERT = DOC.createElement("div");
    ALERT.setAttribute("id", "alert-wrapper");
    ALERT.classList.add("alert-wrapper");

    ALERT.innerHTML = `
      <div class="alert confirm dangerousAlert">
        <p>${this._alertMessage}</p>
        <div class="action-btnGroup">
          <button id="confirm-true" type="submit" class="confirm-btn confirm-true">Yes</button>
          <button id="confirm-false" type="submit" class="confirm-btn confirm-false">No</button>
        </div>
      </div>
    `;

    DOC.getElementById("main").appendChild(ALERT);
    DOC.getElementById("confirm-true").focus();
  }
}