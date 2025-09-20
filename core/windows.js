import { WindowOpenWay } from "/core/enum.js";
import { AbsPos } from "/core/basic.js";
import { Settings } from "/core/settings.js";

console.debug("hi");


class Window extends HTMLElement {

  constructor() {
    super();
		this.classList.add("tos-window");
  }

	connectedCallback() {
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
		closeBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.close();
		});
		// Create/header/full
		const fullBtn = document.createElement("button");
		fullBtn.className = "action-full";
		fullBtn.textContent = "O";
		fullBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.isFullscreen = !this.isFullscreen;
		});

		// Create/content
		const content = document.createElement("section");
		content.className = "window-content";
		content.innerHTML = contentHTML;

		// Gather
		header.appendChild(fullBtn);
		header.appendChild(closeBtn);
		this.header = header;
		this.appendChild(header);
		this.content = content;
		this.appendChild(content);

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
				let pos = new AbsPos(e.clientX - offsetX, e.clientY - offsetY);
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
		let openway = this.dataset.openway || Settings.windows.defaultOpenWay || 'top';
		let openPos = new AbsPos(0, 0);
		const parentRect = this.parentElement.getBoundingClientRect();
		const selfRect = this.getBoundingClientRect();
		switch (openway)
		{
			case WindowOpenWay.TOP:
			{
				openPos.left = 0;
				openPos.top = 0;
			} break;
			case WindowOpenWay.CENTER:
			{
				openPos.left = parentRect.width/2 - selfRect.width/2;
				openPos.top = parentRect.height/2 - selfRect.height/2;
				console.log("open center:",openPos);
			} break;
			case WindowOpenWay.RANDOM:
			{
				openPos.left = Math.random()*(parentRect.width - (selfRect.width*Settings.windows.openWayRandomFitRatio[0]));
				openPos.top = Math.random()*(parentRect.height - (selfRect.height*Settings.windows.openWayRandomFitRatio[1]));
				console.log("open center:",openPos);
			} break;
			case WindowOpenWay.DVD:
			{
				console.error("dvd openway not yet supported:",openway);
				openPos.left = 0;
				openPos.top = 0;
			} break;
			default: {
				console.error("unknow openway:",openway);
			}
		}
		openPos = this.clampPos(openPos);
		this.style.left = openPos.left + "px";
		this.style.top = openPos.top + "px";

		// Settings
		this.hideHeader = Boolean(this.hasAttribute("data-hideheader"));// this need to be done AFTER open calculations

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
		return new AbsPos(newLeft, newTop);
	}
	clampSelf() {
		let pos = new AbsPos(this.offsetLeft, this.offsetTop);
		pos = this.clampPos(pos);
		this.style.left = (pos.left) + "px";
		this.style.top = (pos.top) + "px";
	}

	// get/set
	get hideHeader()
	{
		return this.__hideHeader;
	}
	set hideHeader(value)
	{
		if (value)
		{
			this.header.style.display = "none";
		} else {
			this.header.style.display = "";
		}
		this.__hideHeader = value;
	}
	get isFullscreen()
	{
		return this.__isFullscreen;
	}
	set isFullscreen(value)
	{
		if (value === this.isFullscreen) return;
		if (value)
		{
			this.__cacheFullscreen = {
				width: this.style.width,
				height: this.style.height,
				left: this.style.left,
				top: this.style.top,
			};
			this.style.width = "100%";
			this.style.height = "100%";
			this.style.left = "0";
			this.style.top = "0";
		} else {
			this.style.width = this.__cacheFullscreen.width;
			this.style.height = this.__cacheFullscreen.height;
			this.style.left = this.__cacheFullscreen.left;
			this.style.top = this.__cacheFullscreen.top;
		}
		this.__isFullscreen = value;
	}
}

// Lisener
document.addEventListener("DOMContentLoaded", Window.initRoot);
customElements.define("tos-window", Window);

export { Window };