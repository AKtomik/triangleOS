import { Window } from "/src/node/windows.js";

// STRUCTURE

class Desk extends Window {
  constructor() {
    super();
		this.classList.add("tos-desk");
		console.log("construct Desk");
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

// DESKTOP

class DesktopIcon extends HTMLElement {
  constructor() {
    super();
		this.classList.add("tos-desktop-icon");
  }

  connectedCallback() {
    this.name = this.dataset.name;

    let mouseSelect = (e) => {
      document.querySelectorAll('.tos-desktop-icon.selected').forEach(i => i.classList.remove('selected'));
      this.classList.add('selected');
    };
		this.onpointerdown = mouseSelect;
  }

	get name()
	{
		return this.querySelector("span").textContent;
	}
	set name(value)
	{
		let span = this.querySelector("span");
		if (!span)
		{
			span = document.createElement("span");
			this.appendChild(span);
		}
		span.textContent = value;
	}
}

customElements.define("tos-desktop-icon", DesktopIcon);


export { Desk };