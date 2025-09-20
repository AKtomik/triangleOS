console.debug("hi");


class Window extends HTMLElement {

  constructor() {
    super();
    this.__initialized = false; // avoid double init
  }

	connectedCallback() {
		if (this.__initialized)
		{
			console.error("trying to connect already connected window: ", el);
			return;
		}

		this.__initialized = true;
		console.debug("connecting window: ", this);

		// get content
		const contentHTML = this.innerHTML;
		this.innerHTML = "";

		// Create/header
		const header = document.createElement("header");
		header.className = "window-header";
		header.innerHTML = `<span>${this.dataset.title || "Sans titre"}</span>`;

		// Create/header/close
		const closeBtn = document.createElement("button");
		closeBtn.className = "action-close";
		closeBtn.textContent = "X";
		header.appendChild(closeBtn);

		// Create/content
		const content = document.createElement("section");
		content.className = "window-content";
		content.innerHTML = contentHTML;

		// Gather
		this.header = header;
		this.content = content;
		this.appendChild(header);
		this.appendChild(content);

		// Close
		closeBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.close();
		});

		// Drag
		let offsetX, offsetY, isDragging = false;
		header.addEventListener("mousedown", (e) => {
			e.stopPropagation(); // not propagging to parents
			isDragging = true;
			document.body.style.userSelect = "none";
			offsetX = e.clientX - this.offsetLeft;
			offsetY = e.clientY - this.offsetTop;
			this.style.zIndex = Window.zCounter++;
		});
		document.addEventListener("mousemove", (e) => {
			if (isDragging) {
				let pos = { left: e.clientX - offsetX, top: e.clientY - offsetY };
				pos = this.clampPos(pos);
				this.style.left = (pos.left) + "px";
				this.style.top = (pos.top) + "px";
			}
		});
		document.addEventListener("mouseup", () => {
			isDragging = false;
			document.body.style.userSelect = "";
		});

		// Open
		this.style.left = 0 + "px";
		this.style.top = 0 + "px";
		this.clampSelf();

		// Focus
		this.addEventListener("mousedown", (e) => {
			e.stopPropagation();
			this.style.zIndex = Window.zCounter++;
		});
		this.style.zIndex = Window.zCounter++;
	}

	// inits
	static initRoot() {
		Window.zCounter = 10;
	}

	// closing
	close() {
		console.debug("closing window: ", this);
		this.remove();
	}
  //disconnectedCallback() {
  //  console.debug("destructing window: ", this);
  //}

	// positioning
	clampPos(pos) {
		const parentRect = this.parentElement.getBoundingClientRect();
		const elRect = this.header.getBoundingClientRect();
		const clampPixelWidth = 50;
		const newTop = Math.max(0, Math.min(pos.top, parentRect.height - elRect.height));
		//newLeft = Math.max(0, Math.min(pos.left, parentRect.width - elRect.width));
		const newLeft = Math.max(clampPixelWidth - elRect.width, Math.min(pos.left, parentRect.width - clampPixelWidth));
		return { top: newTop, left: newLeft };
	}
	clampSelf() {
		let pos = { left: this.offsetLeft, top: this.offsetTop };
		pos = this.clampPos(pos);
		this.style.left = (pos.left) + "px";
		this.style.top = (pos.top) + "px";
	}
}

// Lisener
document.addEventListener("DOMContentLoaded", Window.initRoot);
customElements.define("tos-window", Window);

export { Window };