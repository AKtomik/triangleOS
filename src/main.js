console.log("importing triangleOS...")

import { Window } from "/src/node/windows.js";
import { Desk } from "/src/node/desk.js";
import "/src/node/structure.js";

import { Template } from "/src/misc/template.js";

import { Settings } from  "/src/edit/settings.js";
import * as Enum from  "/src/misc/enum.js";

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