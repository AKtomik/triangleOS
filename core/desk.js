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

customElements.define("tos-desk", Desk);

export { Desk };