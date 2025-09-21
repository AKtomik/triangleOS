import { WindowOpenWay } from "/src/misc/enum.js";

let Settings = {
  ui: { theme: "dark" }, //not used rn
  windows: {
    dataset: {
      default: {
        title: "Sans titre",
        isFullscreen: false,
        openWay: WindowOpenWay.RANDOM,
        hideHeader: false,
        dragHeader: true,
        dragContent: false,
      },
    },
    datacustom: {

    },
    openWayRandomFitRatio: [1, 1],
  },
};

export { Settings };
