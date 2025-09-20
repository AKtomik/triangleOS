const templatesFile = "edit/templates.html";

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
	static spawn(templateId, parent)
	{
		let originalTemplate = document.getElementById(templateId);
		if (originalTemplate == undefined)
		{
			console.error("couldnt find template with id:", parent);
			return;
		}
		let cloneTemplate = originalTemplate.content.cloneNode(true);
		if (typeof parent === 'string')
			parent = document.getElementById(parent);
		if (!parent instanceof Node)
		{
			console.error("given parent is not a Node nor a valid node id:", parent);
			return;
		}
		parent.appendChild(cloneTemplate);
	}
}


export { Template };