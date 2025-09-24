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

export { AbsPos, shallowSignature };