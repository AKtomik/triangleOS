console.debug("hi");


class Window {
	constructor(el, doInitChildWindows = true, doInitChildContainers = false) {
		if (el.__windowInstance)
		{
			console.error("trying to construct already built window: ", el);
			return;
		}

		el.__windowInstance = true;
		console.debug("constructing window: ", el);
		this.el = el;

		// get content
		const contentHTML = el.innerHTML;
		el.innerHTML = "";

		// Create/header
		const header = document.createElement("header");
		header.className = "window-header";
		header.innerHTML = `<span>${el.dataset.title || "Sans titre"}</span>`;

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
		el.appendChild(header);
		el.appendChild(content);

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
			offsetX = e.clientX - this.el.offsetLeft;
			offsetY = e.clientY - this.el.offsetTop;
			this.el.style.zIndex = Window.zCounter++;
		});
		document.addEventListener("mousemove", (e) => {
			if (isDragging) {
				const parentRect = this.el.parentElement.getBoundingClientRect();
				const elRect = this.header.getBoundingClientRect();
				const clampPixelWidth = 50;
				// slide
				let newLeft = e.clientX - offsetX;
				let newTop = e.clientY - offsetY;
				// clamp
				//newLeft = Math.max(0, Math.min(newLeft, parentRect.width - elRect.width));
				newLeft = Math.max(clampPixelWidth - elRect.width, Math.min(newLeft, parentRect.width - clampPixelWidth));
				newTop = Math.max(0, Math.min(newTop, parentRect.height - elRect.height));
				// apply
				this.el.style.left = (newLeft) + "px";
				this.el.style.top = (newTop) + "px";
			}
		});
		document.addEventListener("mouseup", () => {
			isDragging = false;
			document.body.style.userSelect = "";
		});

		// Focus
		el.addEventListener("mousedown", (e) => {
			e.stopPropagation();
			this.el.style.zIndex = Window.zCounter++;
		});
		this.el.style.zIndex = Window.zCounter++;

		// Init sub windows
		if (doInitChildWindows)
			this.initChildrenWindows(content);
		if (doInitChildContainers)
			this.initChildrenContainers(content);
	}

	// inits
	initChildrenWindows(container) {
		// init direct childrens of container
		container.querySelectorAll(":scope > .window").forEach(childEl => {new Window(childEl);});
	}
	initChildrenContainers(container) {
		// init any childrens in a .window-container that is inside container
		container.querySelectorAll(":scope .window-container > .window").forEach(childEl => {
			new Window(childEl);
		});
	}
	static initRoot() {
		console.log("loading cascade...")
		// cascade init
		document.querySelectorAll(".window-container > .window").forEach(el => new Window(el));
		// warn for not inited
		document.querySelectorAll(".window").forEach(el => {
			if (!el.__windowInstance) {
				console.error("a window not loaded because is not a child of .window-container nor .window:\n", el);
			}
		});
		// global init
		Window.zCounter = 10;
		console.log("cascade done!")
	}


	// closing
	close() {
		console.debug("destructing window: ", this.el);
		this.el.remove();
	}

	// static
	static __makeBaseWindow(windowTitle, windowClass) {
		const element = document.createElement("div");
		element.dataset.title = windowTitle;
		element.className = windowClass;
		element.classList.add("window");
		return element;
	}
	static __makeChild(parent, element) {
		if (typeof parent === 'string')
			parent = document.getElementById(parent);
		console.log("parent=",parent)
		parent.appendChild(element);
	}
	static createHtmlWindow(parent, windowTitle, windowClass, htmlSrc) {
		const element = Window.__makeBaseWindow(windowTitle, windowClass);
		element.innerHTML = `<object type="text/html" data="${htmlSrc}"></object>`;
		new Window(element, true, true);
		Window.__makeChild(parent, element);
	}
	static createTemplateWindow(parent, windowTitle, windowClass, templateId) {
		const element = Window.__makeBaseWindow(windowTitle, windowClass);
		let template = document.getElementById(templateId);
		let nodeTemplate = template.content.cloneNode(true);
		element.appendChild(nodeTemplate);
		new Window(element, true, true);
		Window.__makeChild(parent, element);
	}
	static createIframeWindow(parent, windowTitle, windowClass, iframeUrl) {
		const element = Window.__makeBaseWindow(windowTitle, windowClass);
		element.innerHTML = `<iframe src="${iframeUrl}"></iframe>`;
		new Window(element, true, true);
		Window.__makeChild(parent, element);
	}
}

// Lisener
document.addEventListener("DOMContentLoaded", Window.initRoot);

export { Window };