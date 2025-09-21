import { WindowOpenWay } from "/src/misc/enum.js";

let Settings = {
  ui: { theme: "dark" }, //not used rn
  template: {
    path: "/src/edit/templates.html"
  },
  windows: {
    dataset: {
      default: {
        title: "Sans titre",
        isFullscreen: false,
        hideHeader: false,
        cornerResizable: true,
        openWay: WindowOpenWay.RANDOM,

        dragHeader: true,
        dragContent: false,
        
        enableCloseButton: true,
        enableFullButton: true,
        enableMiniButton: true,
      },
    },
    datacustom: {

    },
    openWayRandomFitRatio: [1, 1],
    focussingMinimizedWillOpen: true,
  },
};

export { Settings };
