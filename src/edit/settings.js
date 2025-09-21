import { WindowOpenWay, WindowCloseAction } from "/src/misc/enum.js";

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
        
        hideCloseButton: false,
        hideFullButton: false,
        hideMiniButton: false,
        disableCloseButton: false,
        reopenWillRepose: true,// to remove?
        closeAction: WindowCloseAction.CLOSE,
      },
    },
    datacustom: {

    },
    openWayRandomFitRatio: [1, 1],
    focussingMinimizedWillOpen: true,
  },
};

export { Settings };
