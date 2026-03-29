

class Catalog {
	static sizeList = [];

	static registerSize(sizeClassListOrString)
	{
		if (Array.isArray(sizeClassListOrString))
		{
			sizeClassListOrString.forEach(sizeClassName => this.#addSize(sizeClassName));
		} else {
			this.#addSize(sizeClassListOrString)
		}
	}

	static #addSize(sizeClassName)
	{
		this.sizeList.push(sizeClassName);
	}

	static skinCollection = {};// skins by collection key
	static skinOrphan = [];// skins that does not have a collection
	static skinList = [];// all of them

	static registerSkin(skinClassListOrString)
	{
		if (Array.isArray(skinClassListOrString))
		{
			skinClassListOrString.forEach(skinClassName => this.#addOrphanSkin(skinClassName));
		} else {
			this.#addOrphanSkin(skinClassListOrString)
		}
	}

	static #addOrphanSkin(skinClassName)
	{
		this.skinOrphan.push(skinClassName);
		this.skinList.push(skinClassName);
	}
}

Catalog.registerSize(['size-full', 'size-small', 'size-middle']);
Catalog.registerSkin(['skin-white', 'skin-lightgray', 'skin-gray', 'skin-black', 'skin-brown', 'skin-red', 'skin-orange', 'skin-yellow', 'skin-lime', 'skin-green', 'skin-cyan', 'skin-lightblue', 'skin-blue', 'skin-purple', 'skin-magenta', 'skin-pink', 'skin-transparent', 'skin-glass', 'skin-filter-negative', 'skin-filter-grayscale', 'skin-filter-saturate', 'skin-deep']);
//Catalog.registerCollection('top', ['skin-top-white', 'skin-top-lightgray', 'skin-top-gray', 'skin-top-black', 'skin-top-brown', 'skin-top-red', 'skin-top-orange', 'skin-top-yellow', 'skin-top-lime', 'skin-top-green', 'skin-top-cyan', 'skin-top-lightblue', 'skin-top-blue', 'skin-top-purple', 'skin-top-magenta', 'skin-top-pink', 'skin-top-transparent', 'skin-top-glass', 'skin-top-filter-negative', 'skin-top-filter-grayscale', 'skin-top-filter-saturate', 'skin-top-deep']);

export { Catalog };