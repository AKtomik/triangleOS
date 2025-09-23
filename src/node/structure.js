
class WindowContainer extends HTMLElement {
	constructor() {
		super();
		this.classList.add("tos-window-container");
	}
}

class StructureRoot extends WindowContainer {
	constructor() {
		super();
		this.classList.add("tos-root");
	}
}

customElements.define("tos-window-container", WindowContainer);
customElements.define("tos-root", StructureRoot);

export { WindowContainer, StructureRoot };