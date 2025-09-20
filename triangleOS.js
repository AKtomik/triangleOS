console.log("importing triangleOS...")

import { Window } from "/core/windows.js";
import { Desk } from "/core/desk.js";

import { Template } from "/core/templateTools.js";

import { Settings } from  "/core/settings.js";
import * as Enum from  "/core/enum.js";

const TriangleOS = {
  Window,
  Desk,
  Template,
  Settings,
  Enum
};
window.TriangleOS = TriangleOS;
export { TriangleOS };
console.log("triangleOS imported!")