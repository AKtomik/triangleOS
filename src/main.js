console.log("importing triangleOS...")

import { Window } from "./node/windows.js";
import { Desk } from "./node/desk.js";
import "./node/structure.js";

import { Template } from "./misc/template.js";

import { Settings } from  "./default/settings.js";
import * as Enum from  "./misc/enum.js";

const TriangleOS = {
  Window,
  Desk,
  Template,
  Settings,
  Enum
};
window.TriangleOS = TriangleOS;
export { TriangleOS };
console.log("triangleOS imported!");