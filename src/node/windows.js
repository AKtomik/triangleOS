import { WindowOpenWay, WindowCloseAction } from "../misc/enum.js";
import { AbsPos, shallowSignature } from "../misc/basic.js";
import { Settings } from "../default/settings.js";
import { Template } from "../misc/template.js";
import { WindowContainer } from "./structure.js";


class Window extends WindowContainer {

	// STATIC
	
	static zCounter = 10;
	static minimizedList = [];


	/**
	 * Duplicate <template> content and spawn it.
	 * @param {string|Node} template The template Node or id.
	 * @param {string|Node} parent The parent where to spawn.
	 * @returns Nothing.
	 */
	static open(template, parent) {
		// just a shortcut (3 character shorter actually :>)
		Template.spawn(template, parent);
	}

	/**
	 * Get the window containing the element. 
	 * @param {Element} element The element targeted.
	 * @returns {Window}
	 */
	static parent(element)
	{
		return element.closest(".tos-window");
	}

	// NODE

	constructor() {
		super();
		this.classList.add("tos-window");
	}

	connectedCallback() {
		console.debug("connect window: ", this);

		// Unic/id
		this.tosWindowId = `shallow:${shallowSignature(this)}`;
		// Unic/check
		if (this.parentHasSame())
		{
			let sameWindow = this.parentGetSame();
			if (sameWindow.options.unicOpen)
			{
				console.debug("but reopen identical window");
				sameWindow.reopen();
				this.remove();
				return;
			}
		}
		// Unic/add
		this.addToParent();
		if (this._inited) {
			// ! reparenting is triggered when there is neast windows in DOM, but does not have this problem with templates
			//this.positioning();
			console.debug("but is just reparenting");
			return;
		};
		this._inited = true;

		// Settings/load
		let loadDataSetId = 'default';
		let loadDataCustomId;
		let windowSettings = { ...Settings.windows.dataset[loadDataSetId], ...Settings.windows.datacustom[loadDataCustomId]	};
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
		console.debug("windowSettings:",windowSettings);

		// Settings/options
		this.options = {
			unicOpen: windowSettings.unicOpen,
			openWay: windowSettings.openWay,
			closeAction: windowSettings.closeAction,
			reopenWillRepose: windowSettings.reopenWillRepose
		}

		// Create/content
		const content = document.createElement("section");
		content.className = "window-content";
		// Create/tranfert
		const fragment = document.createDocumentFragment();
		while (this.firstChild) {
			fragment.appendChild(this.firstChild);
		}
		content.appendChild(fragment);
		// Create/header
		const header = document.createElement("header");
		header.className = "window-header";
		let createElementImage = (imgSrc) => {
			let image = document.createElement("img");
			image.src = imgSrc;
			return image;
		}
		// Create/header/close
		const closeBtn = document.createElement("button");
		closeBtn.className = "action-close";
		closeBtn.appendChild(createElementImage("src/assets/buttons/close.svg"));
		closeBtn.onpointerdown = (e) => e.stopPropagation();
		closeBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.close();
		});
		// Create/header/full
		const fullBtn = document.createElement("button");
		fullBtn.className = "action-full";
		fullBtn.appendChild(createElementImage("src/assets/buttons/full.svg"));
		fullBtn.onpointerdown = (e) => e.stopPropagation();
		fullBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.isFullscreen = !this.isFullscreen;
		});
		// Create/header/min
		const miniBtn = document.createElement("button");
		miniBtn.className = "action-full";
		miniBtn.appendChild(createElementImage("src/assets/buttons/mini.svg"));
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
			document.addEventListener("pointerup", this.stopDrag);

			isDragging = true;
			document.onpointermove = drag;
			this.classList.add("tos-is-dragging");
			document.body.style.userSelect = "none";
			
			offsetX = e.clientX - this.offsetLeft;
			offsetY = e.clientY - this.offsetTop;
			this.style.zIndex = Window.zCounter++;
		}
		let stopDrag = (e) => {
			e.stopPropagation();
			document.removeEventListener("pointerup", this.stopDrag);

			isDragging = false;
			document.onpointermove = null;
			this.classList.remove("tos-is-dragging");
			document.body.style.userSelect = "";
		}
		// Drag/references
		this.beginDrag = beginDrag;
		this.stopDrag = stopDrag;
		// begin drag enabeled after

		// Open/position
		requestAnimationFrame(() => {
			// ! need to use requestAnimationFrame else it can be posed before parent ready
			this.positioning();
		})

		// Settings
		this.hideHeader = windowSettings.hideHeader;// this need to be done AFTER open calculations (idk why but it is)
		this.hideCloseButton = windowSettings.hideCloseButton;
		this.hideFullButton = windowSettings.hideFullButton;
		this.hideMiniButton = windowSettings.hideMiniButton;
		this.isFullscreen = windowSettings.isFullscreen;
		this.dragHeader = windowSettings.dragHeader;
		this.dragContent = windowSettings.dragContent;
		this.disableCloseButton = windowSettings.disableCloseButton;
		this.closeAction = windowSettings.closeAction;//no set reaction
		this.cornerResizable = windowSettings.cornerResizable;

		// Open/focus
		this.addEventListener("mousedown", (e) => {
			e.stopPropagation();
			this.focus();
		});
		this.focus();// foccus on connect
	}

	disconnectedCallback() {
		console.debug("disconnect window: ", this);
		this.removeToParent();
	}

	// PRIVATE

	clampPos(pos) {
		const parentRect = this.parentElement.getBoundingClientRect();
		const elRect = this.header.getBoundingClientRect();
		const clampMinWidth = 50;
		const newTop = Math.max(0, Math.min(pos.top, parentRect.height - elRect.height));
		//const newLeft = Math.max(0, Math.min(pos.left, parentRect.width - elRect.width));
		// ! when using clampPos when inited, elRect.width can be 0
		const newLeft = Math.max(Math.min(0, clampMinWidth - elRect.width), Math.min(pos.left, parentRect.width - clampMinWidth));
		return new AbsPos(newLeft, newTop);
	}
	clampSelf() {
		let pos = new AbsPos(this.offsetLeft, this.offsetTop);
		pos = this.clampPos(pos);
		this.style.left = (pos.left) + "px";
		this.style.top = (pos.top) + "px";
	}
	positioning() {
		//console.debug('positionning window:',this, this.parentElement);
		const parentRect = this.parentElement.getBoundingClientRect();
		const selfRect = this.getBoundingClientRect();
		let openway = this.options.openWay;
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
			} break;
			case WindowOpenWay.RANDOM:
			{
				openPos.left = Math.random()*(parentRect.width - (selfRect.width*Settings.windows.openWayRandomFitRatio[0]));
				openPos.top = Math.random()*(parentRect.height - (selfRect.height*Settings.windows.openWayRandomFitRatio[1]));
			} break;
			case WindowOpenWay.DVD:
			{
				console.error("WindowOpenWay.DVD not yet supported");
				openPos.left = 0;
				openPos.top = 0;
			} break;
			default: {
				console.error("unknow openWay:",openway);
			}
		}
		openPos = this.clampPos(openPos);
		this.style.left = openPos.left + "px";
		this.style.top = openPos.top + "px";
	}

	parentHasSame()
	{
		let parent = this.parentElement;
		let key = this.tosWindowId;
		return (parent.tos_windowContainerValut?.[key]?.length > 0)
	}

	parentGetSame()
	{
		let parent = this.parentElement;
		let key = this.tosWindowId;
		let list = parent.tos_windowContainerValut[key];
		return list[list.length - 1];
	}

	addToParent()
	{
		this.attachedParent = this.parentElement;
		let parent = this.attachedParent;
		let key = this.tosWindowId;
		if (parent.tos_windowContainerValut === undefined)
			parent.tos_windowContainerValut = {};
		if (parent.tos_windowContainerValut[key] === undefined)
			parent.tos_windowContainerValut[key] = [];
		parent.tos_windowContainerValut[key].push(this);
	}

	removeToParent()
	{
		if (!this._inited) return;
		let parent = this.attachedParent;
		let key = this.tosWindowId;
		const removeIndex = parent.tos_windowContainerValut[key].indexOf(this);
		if (removeIndex === -1) {
			throw new Error("trying remove to parent but is not in Window.minimizedList");
		}
		parent.tos_windowContainerValut[key].splice(removeIndex, 1);
		if (parent.tos_windowContainerValut[key].length === 0)
			parent.tos_windowContainerValut[key] = undefined;
	}

	// PROPETIES
	
	get title()
	{
		return this.header.title;
	}
	set title(value)
	{
		this.header.title = value;
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
		return this._isFullscreen;
	}
	set isFullscreen(value)
	{
		if (value === this.isFullscreen) return;
		if (value)
		{
			this.classList.add("tos-is-fullscreen");
			this._cacheFullscreen = {
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
			this.classList.remove("tos-is-fullscreen");
			if (this._cacheFullscreen)
			{
				this.style.width = this._cacheFullscreen.width;
				this.style.height = this._cacheFullscreen.height;
				this.style.left = this._cacheFullscreen.left;
				this.style.top = this._cacheFullscreen.top;
			}
		}
		this._isFullscreen = value;
	}
	
	get hideHeader()
	{
		return this._hideHeader;
	}
	set hideHeader(value)
	{
		if (value)
		{
			this.header.style.display = "none";
		} else {
			this.header.style.display = "";
		}
		this._hideHeader = value;
	}
	
	get hideMiniButton()
	{
		return this._hideMiniButton;
	}
	set hideMiniButton(value)
	{
		if (value)
		{
			this.buttons.mini.style.display = "none";
		} else {
			this.buttons.mini.style.display = "";
		}
		this._hideMiniButton = value;
	}
	
	get hideFullButton()
	{
		return this._hideFullButton;
	}
	set hideFullButton(value)
	{
		if (value)
		{
			this.buttons.full.style.display = "none";
		} else {
			this.buttons.full.style.display = "";
		}
		this._hideFullButton = value;
	}
	
	get hideCloseButton()
	{
		return this._hideCloseButton;
	}
	set hideCloseButton(value)
	{
		if (value)
		{
			this.buttons.close.style.display = "none";
		} else {
			this.buttons.close.style.display = "";
		}
		this._hideCloseButton = value;
	}

	get disableCloseButton()
	{
		return this._disableCloseButton;
	}
	set disableCloseButton(value)
	{
		if (value)
		{
			this.buttons.close.setAttribute("disabled", "");
		} else {
			this.buttons.close.removeAttribute("disabled");
		}
		this._disableCloseButton = value;
	}
	
	get dragHeader()
	{
		return this._dragHeader;
	}
	set dragHeader(value)
	{
		if (value)
		{
			this.header.onpointerdown = this.beginDrag;
		} else {
			this.header.onpointerdown = undefined;
		}
		this._dragHeader = value;
	}
	get dragContent()
	{
		return this._dragContent;
	}
	set dragContent(value)
	{
		if (value)
		{
			this.content.onpointerdown = this.beginDrag;
		} else {
			this.content.onpointerdown = undefined;
		}
		this._dragContent = value;
	}

	get cornerResizable()
	{
		return this._cornerResizable;
	}
	set cornerResizable(value)
	{
		if (value)
		{
			this.style.resize = undefined;
		} else {
			this.style.resize = "none";
		}
		this._cornerResizable = value;
	}

	// METHODS

	close() {
		console.debug(`close window with action [${this.options.closeAction}]:`, this);
		let closeAction = this.options.closeAction;
		switch (closeAction)
		{
			case undefined:
				console.error("undefined closeAction:",closeAction);
				// not breaking
			case WindowCloseAction.REMOVE:
				this.remove();
				break;
			case WindowCloseAction.MINIMIZE:
				this.minimize();
				break;
			case WindowCloseAction.REPOS:
				this.positioning();
				break;
			case WindowCloseAction.REOPEN:
				this.reopen();
				break;
			case WindowCloseAction.DUMMY: break;
			default: {
				console.error("unknow closeAction:",closeAction);
			}
		}
	}
	
	minimize() {
		this.style.display = "none";
		Window.minimizedList.push(this);
		this._isMinimized = true;
	}

	reopen() {
		if (this._isMinimized)
		{
			this._isMinimized = false;
			this.style.display = "";
			const removeIndex = Window.minimizedList.indexOf(this);
			if (removeIndex === -1) {
				throw new Error("trying reopen but is not in Window.minimizedList");
			}
			Window.minimizedList.splice(removeIndex, 1);
		}
		if (this.options.reopenWillRepose)
		{
			this.positioning();
		}
		this.focus();
	}
	
	focus() {
		if (this._isMinimized)
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

	applySkin(classSkinName, removeOthers = true)
	{
		if (!classSkinName.startsWith("skin-"))
		{
			console.error("the skin given to applySkin does not starts with 'skin-':",classSkinName);
			return;
		}
		if (removeOthers)
		{
			this.classList.forEach(cls => {
				if (cls.startsWith("skin-")) {
						this.classList.remove(cls);
					}
				}
			)
		}
		this.classList.add(classSkinName);
	}

	applySize(classSizeName, removeOthers = true)
	{
		if (!classSizeName.startsWith("size-"))
		{
			console.error("the skin given to applySkin does not starts with 'skin-':",classSizeName);
			return;
		}
		if (removeOthers)
		{
			this.classList.forEach(cls => {
				if (cls.startsWith("size-")) {
						this.classList.remove(cls);
					}
				}
			)
		}
		this.classList.add(classSizeName);
	}
}

// Lisener
document.addEventListener("DOMContentLoaded", Window.initRoot);
customElements.define("tos-window", Window);

export { Window };