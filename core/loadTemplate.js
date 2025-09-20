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