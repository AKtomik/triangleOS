console.log("hi");


class Window {
	constructor(el) {
		console.log("windows create: ", el);
		this.el = el;

		// get content
		const contentHTML = el.innerHTML;
		el.innerHTML = "";

		// Create/header
		const header = document.createElement("header");
		header.className = "window-header";
		header.innerHTML = `<span>${el.dataset.title || "Sans titre"}</span>`;

		//// Create/header/close
		//const closeBtn = document.createElement("button");
		//closeBtn.textContent = "X";
		//header.appendChild(closeBtn);

		// Create/content
		const content = document.createElement("section");
		content.className = "window-content";
		content.innerHTML = contentHTML;

		// Gather
		el.appendChild(header);
		el.appendChild(content);

		//// Close
		//closeBtn.addEventListener("click", (e) => {
		//	e.stopPropagation();
		//	this.close();
		//});

		// Drag
		let offsetX, offsetY, isDragging = false;
		header.addEventListener("mousedown", (e) => {
			e.stopPropagation(); // not propagging to parents
			isDragging = true;
			offsetX = e.clientX - this.el.offsetLeft;
			offsetY = e.clientY - this.el.offsetTop;
			this.el.style.zIndex = Window.zCounter++;
		});
		document.addEventListener("mousemove", (e) => {
			if (isDragging) {
				this.el.style.left = (e.clientX - offsetX) + "px";
				this.el.style.top = (e.clientY - offsetY) + "px";
			}
		});
		document.addEventListener("mouseup", () => {
			isDragging = false;
		});

		// Focus
		el.addEventListener("mousedown", (e) => {
			e.stopPropagation();
			this.el.style.zIndex = Window.zCounter++;
		});

		//// Init sub windows
		//this.initChildren(content);
	}

	close() {
		this.el.remove();
	}
	//initChildren(container) {
	//	container.querySelectorAll(":scope > .window").forEach(childEl => {
	//		new Window(childEl, this.el);
	//	});
	//}
}

// Init root windows
window.onload = () => {
	//document.querySelectorAll("body > .window").forEach(el => new Window(el));
	console.log("loading...")
	document.querySelectorAll(".window").forEach(el => new Window(el));
	Window.zCounter = 10;
};