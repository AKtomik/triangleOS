import { Template } from "../misc/template.js";

class SpawnTemplate extends HTMLElement {
	connectedCallback() {
		Template.waitLoaded(() => this.spawn())
	}
	spawn() {
		let template = this.getAttribute("template");
		
		if (typeof template === 'string')
		{
			let templateId = template;
			template = document.getElementById(templateId);
			if (template == undefined)
			{
				return console.error("couldnt find element with id:", templateId);
			}
		}
		if (!(template instanceof Node))
		{
			return console.error("given element is not a Node nor a valid node id:", parent);
		}
		if (template.tagName != "TEMPLATE")
		{
			return console.error("spawning element that is not a template:", template, "\nuse Template.spawnPsedoTemplate to fake a template.");
		}

		const clone = template.content.cloneNode(true);
		console.log("spawn replace with template:",clone);
		this.replaceWith(clone);
	}
}

customElements.define("tos-spawn", SpawnTemplate);