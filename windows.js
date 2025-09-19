console.log("hi");


class Window {
	constructor(el, constructChilds = false) {
		console.log("windows create: ", el);
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

		//el.classList.add("window-init");
		el.__windowInstance = true;

		//// Init sub windows
		if (constructChilds)
			this.initChildren(content);
	}

	// construct methods
	close() {
		this.el.remove();
	}
	initChildren(container) {
		container.querySelectorAll(":scope > .window").forEach(childEl => {
			new Window(childEl, true);
		});
	}
}

// Inits
window.onload = () => {
	console.log("loading cascade...")
	// cascade init
	document.querySelectorAll(".window-container > .window").forEach(el => new Window(el, true));
	// warn for not inited
	document.querySelectorAll(".window").forEach(el => {
		if (!el.__windowInstance) {
			console.error("a window not loaded because is not a child of .window-container nor .window:\n", el);
		}
	});
	// global init
	Window.zCounter = 10;
};