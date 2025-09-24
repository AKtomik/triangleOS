import { deepMerge } from "../misc/basic.js";
import { WindowOpenWay, WindowCloseAction } from "../misc/enum.js";

let defaultSettings = {
  template: {
    path: "/tos-templates.html"
  },

  windows: {
    dataset: {
      default: {/* the defaults parameters */
        title: "Sans titre",
        isFullscreen: false,
        hideHeader: false,
        openWay: WindowOpenWay.RANDOM,
        unicOpen: true,

        dragHeader: true,
        dragContent: false,

        hideCloseButton: false,
        hideFullButton: false,
        hideMiniButton: false,
        closeAction: WindowCloseAction.REMOVE,
        reopenWillRepose: false,
        disableCloseButton: false,
        cornerResizable: true,
      },
      full: {/* for windows taking the entire container, wihtout header (like desktop) */
        title: "Sans titre",
        isFullscreen: true,
        hideHeader: true,
        openWay: WindowOpenWay.RANDOM,
        unicOpen: true,

        dragHeader: true,
        dragContent: false,

        hideCloseButton: false,
        hideFullButton: false,
        hideMiniButton: false,
        closeAction: WindowCloseAction.REMOVE,
        reopenWillRepose: false,
        disableCloseButton: false,
        cornerResizable: true,
      },
    },
    datacustom: {

    },
    openWayRandomFitRatio: [1, 1],
    focussingMinimizedWillOpen: true,
  },
};

let userSettings;

// user settings : node
const el = document.getElementById("tos-settings");
if (el) {
  console.log("User settings from script#tos-settings found!");
  userSettings = JSON.parse(el.textContent);
}

// user settings : global
if (window.TOS_SETTINGS) {
  console.log("User settings from window.TOS_SETTINGS found!");
  if (userSettings) {
    console.error("There is more than one ways of inputing settings used.\nChoose between using a json node OR a global variable.\nOnly the json node is read");
  } else {
    userSettings = window.TOS_SETTINGS;
  }
}


export var Settings = deepMerge(defaultSettings, userSettings);
