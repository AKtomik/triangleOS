import { Settings } from "../default/settings.js";

async function loadTemplates() {
	let templatesFile = Settings.template.path;
	console.log(`loading templates at [${templatesFile}]...`);
	const res = await fetch(templatesFile);
	const text = await res.text();
	const frag = document.createRange().createContextualFragment(text);
	document.body.appendChild(frag); // injects templates into DOM (but hidden)
	console.log(`templates loaded!`);
}

document.addEventListener("DOMContentLoaded", loadTemplates);


class Template {

	/**
	 * Duplicate <template> content and spawn it.
	 * @param {string|Node} template The template Node or id.
	 * @param {string|Node} parent The parent where to spawn.
	 * @returns Nothing.
	 */
	static spawn(template, parent)
	{
		if (typeof template === 'string')
			template = document.getElementById(template);
		if (template == undefined)
		{
			console.error("couldnt find element with id:", template);
			return;
		}
		if (template.tagName != "TEMPLATE")
		{
			console.error("spawning element that is not a template:", template, "\nuse Template.spawnPsedoTemplate to fake a template.");
			return;
		}
		if (typeof parent === 'string')
			parent = document.getElementById(parent);
		if (!parent instanceof Node)
		{
			console.error("given parent is not a Node nor a valid node id:", parent);
			return;
		}
		let clone = template.content.cloneNode(true);
		parent.appendChild(clone);
	}
	
	/**
	 * Duplicate Node's childs like it is a template. The node need to have the data-template atr.
	 * WARNING: cloning inited window wont work.
	 * @param {string|Node} dataTemplate The data-template's element's id or Node.
	 * @param {string|Node} parent The parent where to spawn.
	 * @returns Nothing.
	 */
	static spawnPsedoTemplate(dataTemplate, parent, cloneTemplateRoot = false)
	{
		if (typeof dataTemplate === 'string')
			dataTemplate = document.getElementById(dataTemplate);
		if (dataTemplate == undefined)
		{
			console.error("couldnt find element with id:", dataTemplate);
			return;
		}
		if (!dataTemplate.hasAttribute("data-template"))
		{
			console.error("add the atr [data-template] to allow cloning with Template.spawnPsedoTemplate():", dataTemplate);
			return;
		}
		if (typeof parent === 'string')
			parent = document.getElementById(parent);
		if (!parent instanceof Node)
		{
			console.error("given parent is not a Node nor a valid node id:", parent);
			return;
		}
		if (cloneTemplateRoot)
		{// cloning parent
			let clone = dataTemplate.cloneNode(true);
			clone.removeAttribute("id"); // avoid duplicate ID
			clone.removeAttribute("data-template"); // avoid confusing clones
		} else {// or just its childs
			let html = dataTemplate.innerHTML;
			parent.insertAdjacentHTML("beforeend", html);
		}
	}
}


export { Template };