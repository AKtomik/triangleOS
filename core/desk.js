import { Window } from "/core/windows.js";

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
		this.classList.add("tos-desk-top");
  }
}

class DeskBar extends HTMLElement {
  constructor() {
    super();
		this.classList.add("tos-desk-bar");
  }
}


customElements.define("tos-desk", Desk);
customElements.define("tos-desk-top", DeskTop);
customElements.define("tos-desk-bar", DeskBar);

export { Desk };