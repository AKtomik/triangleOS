async function loadTemplates() {
  const res = await fetch("templates.html");
  const text = await res.text();
  const frag = document.createRange().createContextualFragment(text);
  document.body.appendChild(frag); // injects templates into DOM (but hidden)
}

document.addEventListener("DOMContentLoaded", loadTemplates);
