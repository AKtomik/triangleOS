import { Window } from "/src/node/windows.js";
import { WindowContainer } from "/src/node/structure.js";

// STRUCTURE

class Desk extends Window {
	constructor() {
		super();
		this.classList.add("tos-desk");
	}
}

class DeskTop extends WindowContainer {
	constructor() {
		super();
		this.classList.add("tos-desktop");
	}

	connectedCallback() {

		let mouseSelect = (e) => {
			e.stopPropagation();
			this.unselectIcon();
		};
		this.onpointerdown = mouseSelect;
	}

	unselectIcon() {
		this.querySelectorAll('.tos-desktop-icon.selected').forEach(i => i.classList.remove('selected'));
	}
}

class DeskBar extends HTMLElement {
	constructor() {
		super();
		this.classList.add("tos-deskbar");
	}
}

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
			e.stopPropagation();
			this.parentElement.unselectIcon();
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


// DESKBAR

class DeskbarLaunch extends HTMLElement {
	constructor() {
		super();
		this.classList.add("tos-deskbar-launch");
	}
}

class DeskbarIcon extends HTMLElement {
	constructor() {
		super();
		this.classList.add("tos-deskbar-icon");
	}
}



// EXPORT

customElements.define("tos-desk", Desk);
customElements.define("tos-desktop", DeskTop);
customElements.define("tos-deskbar", DeskBar);

customElements.define("tos-desktop-icon", DesktopIcon);

customElements.define("tos-deskbar-icon", DeskbarIcon);
customElements.define("tos-deskbar-launch", DeskbarLaunch);

export { Desk };