const templatesFile = "/src/edit/templates.html";

async function loadTemplates() {
	console.log(`loading templates at ${templatesFile}...`);
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
	 * @param {string} dataTemplateId The data-template's element's id.
	 * @param {string|Node} parent The parent where to spawn.
	 * @returns Nothing.
	 */
	static spawn(templateId, parent)
	{
		let originalTemplate = document.getElementById(templateId);
		if (originalTemplate == undefined)
		{
			console.error("couldnt find something with id:", templateId);
			return;
		}
		if (originalTemplate.tagName != "TEMPLATE")
		{
			console.error("spawning something that is not a template:", originalTemplate, "\nuse Template.spawnDataTemplate to fake a template.");
			return;
		}
		if (typeof parent === 'string')
			parent = document.getElementById(parent);
		if (!parent instanceof Node)
		{
			console.error("given parent is not a Node nor a valid node id:", parent);
			return;
		}
		let clone = originalTemplate.content.cloneNode(true);
		parent.appendChild(clone);
	}
	
	/**
	 * Duplicate Node's childs like it is a template. The node need to have the data-template atr.
	 * WARNING: cloning inited window wont work.
	 * @param {string} dataTemplateId The data-template's element's id.
	 * @param {string|Node} parent The parent where to spawn.
	 * @returns Nothing.
	 */
	static spawnDataTemplate(dataTemplateId, parent)
	{
		let originalTemplate = document.getElementById(dataTemplateId);
		if (originalTemplate == undefined)
		{
			console.error("couldnt find something with id:", templateId);
			return;
		}
		if (!originalTemplate.hasAttribute("data-template"))
		{
			console.error("add the atr [data-template] to allow cloning with Template.spawnDataTemplate():", originalTemplate);
			return;
		}
		if (typeof parent === 'string')
			parent = document.getElementById(parent);
		if (!parent instanceof Node)
		{
			console.error("given parent is not a Node nor a valid node id:", parent);
			return;
		}
		// cloning parent
		let clone = originalTemplate.cloneNode(true);
		clone.removeAttribute("id"); // avoid duplicate ID
		clone.removeAttribute("data-template"); // avoid confusing clones
		// or just its childs
		//let html = originalTemplate.innerHTML;
		//console.log("originalTemplate.innerHTML=",originalTemplate.innerHTML);
		//parent.insertAdjacentHTML("beforeend", html);
	}
}


export { Template };