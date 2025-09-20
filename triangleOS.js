console.log("importing triangleOS...")

import { Window } from "/core/windows.js";
import { Desk } from "/core/desk.js";

import { Template } from "/core/templateTools.js";

const TriangleOS = {
  Window,
  Desk,
  Template
};
window.TriangleOS = TriangleOS;
export { TriangleOS };
console.log("triangleOS imported!")