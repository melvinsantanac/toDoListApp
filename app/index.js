import { App } from "./App.js";
import { DOC, WIN } from "./assets/helpers/reusable_variables.js";

/* These lines of code are adding event listeners to the `DOMContentLoaded` and `hashchange` events of
the `document` and `window` objects respectively. */
DOC.addEventListener('DOMContentLoaded', App);
WIN.addEventListener('hashchange', App);