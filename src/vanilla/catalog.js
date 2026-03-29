

class Catalog {
	static sizeList = [];

	static #addSize(sizeClassName)
	{
		if (!sizeClassName.startsWith("size-"))
		{
			console.error("size class name must start with 'size-' but is:",sizeClassName);
			return;
		}
		this.sizeList.push(sizeClassName);
	}

	static registerSize(sizeClassListOrString)
	{
		if (Array.isArray(sizeClassListOrString))
		{
			sizeClassListOrString.forEach(sizeClassName => this.#addSize(sizeClassName));
		} else {
			this.#addSize(sizeClassListOrString)
		}
	}

	static skinCollection = {};// skins by collection key
	static skinOrphan = [];// skins that does not have a collection
	static skinList = [];// all of them

	static #addOrphanSkin(skinClassName)
	{
		if (!skinClassName.startsWith("skin-"))
		{
			console.error("skin class name must start with 'skin-' but is:",skinClassName);
			return;
		}
		this.skinOrphan.push(skinClassName);
		this.skinList.push(skinClassName);
	}

	static #addCollectionSkin(collectionName, skinClassName)
	{
		if (!skinClassName.startsWith(`skin-${collectionName}-`))
		{
			console.error("skin class name of a collection must start with 'skin-<collection>' but is:",skinClassName);
			return;
		}
		this.skinCollection[collectionName].push(skinClassName);
		this.skinList.push(skinClassName);
	}

	static #createCollection(collectionName)
	{
		this.skinCollection[collectionName] = [];
	}

	static registerSkin(skinClassListOrString)
	{
		if (Array.isArray(skinClassListOrString))
		{
			skinClassListOrString.forEach(skinClassName => this.#addOrphanSkin(skinClassName));
		} else {
			this.#addOrphanSkin(skinClassListOrString)
		}
	}
	
	static registerCollection(collectionName, skinClassList)
	{
		this.#createCollection(collectionName);
		skinClassList.forEach(skinClassName => this.#addCollectionSkin(collectionName, skinClassName));
	}
}

Catalog.registerSize(['size-full', 'size-small', 'size-middle']);
Catalog.registerCollection('in', ['skin-in-white', 'skin-in-lightgray', 'skin-in-gray', 'skin-in-black', 'skin-in-brown', 'skin-in-red', 'skin-in-orange', 'skin-in-yellow', 'skin-in-lime', 'skin-in-green', 'skin-in-cyan', 'skin-in-lightblue', 'skin-in-blue', 'skin-in-purple', 'skin-in-magenta', 'skin-in-pink', 'skin-in-transparent', 'skin-in-glass', 'skin-in-filter-negative', 'skin-in-filter-grayscale', 'skin-in-filter-saturate', 'skin-in-deep']);
Catalog.registerCollection('top', ['skin-top-white', 'skin-top-lightgray', 'skin-top-gray', 'skin-top-black', 'skin-top-brown', 'skin-top-red', 'skin-top-orange', 'skin-top-yellow', 'skin-top-lime', 'skin-top-green', 'skin-top-cyan', 'skin-top-lightblue', 'skin-top-blue', 'skin-top-purple', 'skin-top-magenta', 'skin-top-pink', 'skin-top-transparent', 'skin-top-glass', 'skin-top-filter-negative', 'skin-top-filter-grayscale', 'skin-top-filter-saturate', 'skin-top-deep']);

export { Catalog };