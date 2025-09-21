import { WindowOpenWay } from "/src/misc/enum.js";
import { AbsPos } from "/src/misc/basic.js";
import { Settings } from "/src/edit/settings.js";

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

		// settings
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

		// Create/content
		const content = document.createElement("section");
		content.className = "window-content";
		content.innerHTML = contentHTML;

		// Gather
		this.header = header;
		this.title = windowSettings.title;
		header.appendChild(fullBtn);
		header.appendChild(closeBtn);
		
		this.content = content;
		
		this.appendChild(header);
		this.appendChild(content);

		// Drag
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
			e.stopPropagation(); // not propagging to parents
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
			e.stopPropagation(); // not propagging to parents

			isDragging = false;
			document.onpointermove = null;
			this.classList.remove("dragging");
			document.body.style.userSelect = "";
		}
		
		this.beginDrag = beginDrag;
		this.stopDrag = stopDrag;

		// Open
		let openway = windowSettings.openWay;
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
		this.hideHeader = windowSettings.hideHeader;// this need to be done AFTER open calculations
		this.isFullscreen = windowSettings.isFullscreen;
		this.dragHeader = windowSettings.dragHeader;
		this.dragContent = windowSettings.dragContent;

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
}

// Lisener
document.addEventListener("DOMContentLoaded", Window.initRoot);
customElements.define("tos-window", Window);

export { Window };