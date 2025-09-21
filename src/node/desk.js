import { Window } from "/src/node/windows.js";

class Desk extends Window {

  constructor() {
    super();
		this.classList.add("tos-desk");
		console.log("construct Desk");
  }

	connectedCallback() {
		super.connectedCallback?.();
		console.log("connect Desk");
	}
}

class DeskTop extends HTMLElement {
  constructor() {
    super();
		this.classList.add("tos-desktop");
  }
}

class DeskBar extends HTMLElement {
  constructor() {
    super();
		this.classList.add("tos-deskbar");
  }
}


customElements.define("tos-desk", Desk);
customElements.define("tos-desktop", DeskTop);
customElements.define("tos-deskbar", DeskBar);

export { Desk };