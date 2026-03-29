

class Catalog {
	static sizeList = ['size-full', 'size-small', 'size-middle'];

	static skinListType = {
		content: ['skin-white', 'skin-lightgray', 'skin-gray', 'skin-black', 'skin-brown', 'skin-red', 'skin-orange', 'skin-yellow', 'skin-lime', 'skin-green', 'skin-cyan', 'skin-lightblue', 'skin-blue', 'skin-purple', 'skin-magenta', 'skin-pink', 'skin-transparent', 'skin-glass', 'skin-filter-negative', 'skin-filter-grayscale', 'skin-filter-saturate', 'skin-deep'],
		top: ['skin-top-white', 'skin-top-lightgray', 'skin-top-gray', 'skin-top-black', 'skin-top-brown', 'skin-top-red', 'skin-top-orange', 'skin-top-yellow', 'skin-top-lime', 'skin-top-green', 'skin-top-cyan', 'skin-top-lightblue', 'skin-top-blue', 'skin-top-purple', 'skin-top-magenta', 'skin-top-pink', 'skin-top-transparent', 'skin-top-glass', 'skin-top-filter-negative', 'skin-top-filter-grayscale', 'skin-top-filter-saturate', 'skin-top-deep'],
		all: [],
	}

	static skinList = [...this.skinListType.content, ...this.skinListType.top, ...this.skinListType.all];
}

export { Catalog };