import { WindowOpenWay } from "/src/misc/enum.js";
import { AbsPos } from "/src/misc/basic.js";
import { Settings } from "/src/edit/settings.js";

console.debug("hi");


class Window extends HTMLElement {

	// STATIC
	
	static zCounter = 10;
	static minimizedList = [];

	// OBJECT

  constructor() {
    super();
		this.classList.add("tos-window");
  }

	connectedCallback() {
		console.debug("connecting window: ", this);

		// Settings/load
		let loadDataSetId = 'default';
		let loadDataCustomId;
		let windowSettings = { ...Settings.windows.dataset[loadDataSetId], ...Settings.windows.datacustom[loadDataCustomId]  };
		let caseCache = Object.fromEntries(Object.keys(windowSettings).map(k => [k.toLowerCase(), k]));
		for (let k of Object.keys(this.dataset))
		{
			if (windowSettings[caseCache[k.toLowerCase()]] != undefined)
			{
				let value;
				switch (typeof windowSettings[caseCache[k.toLowerCase()]])
				{
					case "boolean": value = (this.dataset[k]==="" || Boolean(this.dataset[k])); break;
					default: value = this.dataset[k];
				}
				windowSettings[caseCache[k.toLowerCase()]] = value;
			} else {
				console.warn(`unknow data settings [data-${k}] for window:`, this);
			}
		}
		console.log("windowSettings:",windowSettings);

		// Create/empty
		const contentHTML = this.innerHTML;
		this.innerHTML = "";
		// Create/content
		const content = document.createElement("section");
		content.className = "window-content";
		content.innerHTML = contentHTML;
		// Create/header
		const header = document.createElement("header");
		header.className = "window-header";
		// Create/header/close
		const closeBtn = document.createElement("button");
		closeBtn.className = "action-close";
		closeBtn.textContent = "X";
		closeBtn.onpointerdown = (e) => e.stopPropagation();
		closeBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.close();
		});
		// Create/header/full
		const fullBtn = document.createElement("button");
		fullBtn.className = "action-full";
		fullBtn.textContent = "□";
		fullBtn.onpointerdown = (e) => e.stopPropagation();
		fullBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.isFullscreen = !this.isFullscreen;
		});
		// Create/header/min
		const miniBtn = document.createElement("button");
		miniBtn.className = "action-full";
		miniBtn.textContent = "__";
		miniBtn.onpointerdown = (e) => e.stopPropagation();
		miniBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.minimize();
		});

		// Gather/references
		this.header = header;
		this.content = content;
		this.buttons = {
			mini: miniBtn,
			full: fullBtn,
			close: closeBtn
		}
		// Gather/header
		this.title = windowSettings.title;
		header.appendChild(miniBtn);
		header.appendChild(fullBtn);
		header.appendChild(closeBtn);
		// Gather/it
		this.appendChild(header);
		this.appendChild(content);

		// Drag/functions
		let offsetX, offsetY, isDragging = false;
		let drag = (e) => {
			if (isDragging) {
				let pos = new AbsPos(e.clientX - offsetX, e.clientY - offsetY);
				pos = this.clampPos(pos);
				this.style.left = (pos.left) + "px";
				this.style.top = (pos.top) + "px";
			}
		}
		let beginDrag = (e) => {
			e.stopPropagation();
			if (this.isFullscreen) return;
			
			isDragging = true;
			document.onpointermove = drag;
			this.classList.add("dragging");
			document.body.style.userSelect = "none";
			
			offsetX = e.clientX - this.offsetLeft;
			offsetY = e.clientY - this.offsetTop;
			this.style.zIndex = Window.zCounter++;
		}
		let stopDrag = (e) => {
			e.stopPropagation();

			isDragging = false;
			document.onpointermove = null;
			this.classList.remove("dragging");
			document.body.style.userSelect = "";
		}
		// Drag/references
		this.beginDrag = beginDrag;
		this.stopDrag = stopDrag;
		// drag enabled after

		// Open/position
		const parentRect = this.parentElement.getBoundingClientRect();
		const selfRect = this.getBoundingClientRect();
		let openway = windowSettings.openWay;
		let openPos = new AbsPos(0, 0);
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
		this.hideHeader = windowSettings.hideHeader;// this need to be done AFTER open calculations (idk why but it is)
		this.enableCloseButton = windowSettings.enableCloseButton;
		this.enableFullButton = windowSettings.enableFullButton;
		this.enableMiniButton = windowSettings.enableMiniButton;
		this.isFullscreen = windowSettings.isFullscreen;
		this.dragHeader = windowSettings.dragHeader;
		this.dragContent = windowSettings.dragContent;

		// Open/focus
		this.addEventListener("mousedown", (e) => {
			e.stopPropagation();
			this.focus();
		});
		this.style.zIndex = Window.zCounter++;
	}

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

	// propeties
	get title()
	{
		return this.header.querySelector("span").textContent;
	}
	set title(value)
	{
		let span = this.header.querySelector("span");
		if (!span)
		{
			span = document.createElement("span");
			if (this.header.firstChild) {
				this.header.insertBefore(span, this.header.firstChild);
			} else {
				this.header.appendChild(span);
			}
		}
		span.textContent = value;
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
			this.classList.add("fullscreen");
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
			this.classList.remove("fullscreen");
			if (this.__cacheFullscreen)
			{
				this.style.width = this.__cacheFullscreen.width;
				this.style.height = this.__cacheFullscreen.height;
				this.style.left = this.__cacheFullscreen.left;
				this.style.top = this.__cacheFullscreen.top;
			}
		}
		this.__isFullscreen = value;
	}
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
	get enableCloseButton()
	{
		return this.__enableCloseButton;
	}
	set enableCloseButton(value)
	{
		if (value)
		{
			this.buttons.close.style.display = "";
		} else {
			this.buttons.close.style.display = "none";
		}
		this.__enableCloseButton = value;
	}
	get enableFullButton()
	{
		return this.__enableFullButton;
	}
	set enableFullButton(value)
	{
		if (value)
		{
			this.buttons.full.style.display = "";
		} else {
			this.buttons.full.style.display = "none";
		}
		this.__enableFullButton = value;
	}
	get enableMiniButton()
	{
		return this.__enableMiniButton;
	}
	set enableMiniButton(value)
	{
		if (value)
		{
			this.buttons.mini.style.display = "";
		} else {
			this.buttons.mini.style.display = "none";
		}
		this.__enableMiniButton = value;
	}
	get dragHeader()
	{
		return this.__dragHeader;
	}
	set dragHeader(value)
	{
		if (value)
		{
			this.header.onpointerdown = this.beginDrag;
			this.header.onpointerup = this.stopDrag;
		} else {
			this.header.onpointerdown = undefined;
			this.header.onpointerup = undefined;
		}
		this.__dragHeader = value;
	}
	get dragContent()
	{
		return this.__dragContent;
	}
	set dragContent(value)
	{
		if (value)
		{
			this.content.onpointerdown = this.beginDrag;
			this.content.onpointerup = this.stopDrag;
		} else {
			this.content.onpointerdown = undefined;
			this.content.onpointerup = undefined;
		}
		this.__dragContent = value;
	}

	// actions
	close() {
		console.debug("closing window: ", this);
		this.remove();
	}
	
	minimize() {
		this.style.display = "none";
		Window.minimizedList.push(this);
		this.__isMinimized = true;
	}

	open() {
		if (this.__isMinimized)
		{
			this.style.display = "";
			Window.minimizedList.remove(this);
			this.__isMinimized = false;
		}
		this.focus();
	}
	
	focus() {
		if (this.__isMinimized)
		{
			if (Settings.windows.focussingMinimizedWillOpen)
			{
				this.open();
			}
			return;
		}
		super.focus?.();
		this.style.zIndex = Window.zCounter++;
	}
}

// Lisener
document.addEventListener("DOMContentLoaded", Window.initRoot);
customElements.define("tos-window", Window);

export { Window };