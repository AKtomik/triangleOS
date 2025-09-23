import { WindowOpenWay, WindowCloseAction } from "/src/misc/enum.js";

let Settings = {
  ui: { theme: "dark" }, //not used rn
  template: {
    path: "/src/edit/templates.html"
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

export { Settings };
