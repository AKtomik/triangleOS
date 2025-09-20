import "/core/windows.js";
import "/core/loadTemplate.js";

async function injectCSSFile(url) {
  const res = await fetch(url);
  const css = await res.text();
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}

injectCSSFile("core/main.css")
injectCSSFile("core/windows.css")
injectCSSFile("core/deskdown.css")
injectCSSFile("core/atr.css")
injectCSSFile("edit/skin.css")