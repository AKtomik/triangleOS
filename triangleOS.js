console.log("importing triangleOS...")
import { Window } from "/core/windows.js";
import "/core/loadTemplate.js";
console.log("triangleOS imported!")

const TriangleOS = {
  Window
};
window.TriangleOS = TriangleOS;
export { TriangleOS };