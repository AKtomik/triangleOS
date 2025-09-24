class AbsPos {
	constructor(left, top) {
		this.left = left;
		this.top = top;
	}

	get(index) {
		if (index === 0) return this.left;
		if (index === 1) return this.top;
	}
	set(index, value) {
		if (index === 0) this.left = value;
		if (index === 1) this.top = value;
	}
	
	[Symbol.iterator]() {
		return [this.left, this.top][Symbol.iterator]();
	}
}

function shallowSignature(node) {
	let attrs = Array.from(node.attributes)
		.map(a => `${a.name}=${a.value}`)
		.join(";");
	return `${node.tagName}:${attrs}`;
}

function deepMerge(target, source) {
	if (!source) return target;
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

export { AbsPos, shallowSignature, deepMerge };