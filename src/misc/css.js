/**
 * Load a CSS file into the document <head>.
 * @param {string} href - The CSS file URL.
 * @param {boolean} optional - If true, errors are ignored when file not found.
 */
async function loadCss(href, optional = false) {
	try {
		const res = await fetch(href, { method: "HEAD" });
		if (!res.ok) {
			if (!optional) console.warn(`CSS not found: ${href}`);
			return;
		}
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = href;
		document.head.appendChild(link);
		console.log(`CSS loaded: ${href}`);
	} catch (err) {
		if (!optional) {
			console.error(`Failed to load CSS: ${href}`, err);
		}
	}
}

/**
 * Load CSS from your package (always required).
 * @param {string} path - Path relative to the package.
 */
function loadPackageCss(path) {
	// Assumes your package is served from node_modules or CDN
	const url = new URL(path, import.meta.url).href;
	loadCss(url, false);
}

/**
 * Load CSS from the user project root (optional).
 * @param {string} path - Path relative to project root (e.g. "/tos-skin.css").
 */
function loadUserCss(path = "tos-skin.css") {
	loadCss(path, true);
}

export { loadPackageCss, loadUserCss };