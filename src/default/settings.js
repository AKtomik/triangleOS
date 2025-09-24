import { WindowOpenWay, WindowCloseAction } from "../misc/enum.js";
import { loadSettings } from "../misc/loader.js";

let defaultSettings = {
  template: {
    path: "/tos-templates.html"
  },
  
  usersettings: {
    path: "/tos-settings.json"
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

export var Settings = await loadSettings(defaultSettings);
