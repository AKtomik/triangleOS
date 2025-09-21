import { WindowOpenWay } from "/src/misc/enum.js";

let Settings = {
  ui: { theme: "dark" }, //not used rn
  windows: {
    dataset: {
      default: {
        title: "Sans titre",
        isfullscreen: false,
        openWay: WindowOpenWay.RANDOM,
        dragHeader: true,
        dragBody: false,
        hideHeader: true,
      },
    },
    datacustom: {

    },
    openWayRandomFitRatio: [1, 1],
  },
};

export { Settings };
