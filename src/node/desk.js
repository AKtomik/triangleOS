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
		
		const contentHTML = this.innerHTML;
		this.innerHTML = "";

		const content = document.createElement("section");
		const footer = document.createElement("footer");
		this.content = content;
		this.footer = footer;

		let nameNode = document.createElement("p");
		nameNode.classList.add("tos-desktop-icon-name");
		footer.appendChild(nameNode);
		
		content.innerHTML = contentHTML;

		this.appendChild(content);
		this.appendChild(footer);

    this.name = this.dataset.name;

    let mouseSelect = (e) => {
      document.querySelectorAll('.tos-desktop-icon.selected').forEach(i => i.classList.remove('selected'));
      this.classList.add('selected');
    };
		this.onpointerdown = mouseSelect;
  }

	get name()
	{
		return this.footer.querySelector(".tos-desktop-icon-name").textContent;
	}
	set name(value)
	{
		let nameNode = this.footer.querySelector(".tos-desktop-icon-name");
		nameNode.textContent = value;
	}
}

customElements.define("tos-desktop-icon", DesktopIcon);


export { Desk };