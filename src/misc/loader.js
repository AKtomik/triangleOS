

async function readJSON(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`HTTP error ${response.status}`);
		const data = await response.json();
		return data;
	} catch (err) {
		console.error("Failed to read JSON:", err);
		return null;
	}
}

function deepMerge(target, source) {
	for (const key in source) {
		if (
			source[key] &&
			typeof source[key] === "object" &&
			!Array.isArray(source[key])
		) {
			if (!target[key] || typeof target[key] !== "object") {
				target[key] = {};
			}
			deepMerge(target[key], source[key]);
		} else {
			target[key] = source[key];
		}
	}
	return target;
}

async function loadSettings(defaultSettings) {
	let userSettings = await readJSON(defaultSettings.usersettings.path);
	if (!userSettings) return defaultSettings;
	return deepMerge(structuredClone(defaultSettings), userSettings);
}

export { loadSettings };