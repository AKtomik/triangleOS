console.log("importing triangleOS...")
import { Window } from "/core/windows.js";
import { Template } from "/core/templateTools.js";

const TriangleOS = {
  Window,
  Template
};
window.TriangleOS = TriangleOS;
export { TriangleOS };
console.log("triangleOS imported!")