import { WindowOpenWay, } from "/src/misc/enum.js"

let Settings = {
  ui: { theme: 'dark' },//not used rn
  windows: { defaultOpenWay: WindowOpenWay.RANDOM, openWayRandomFitRatio: [1, 1] }
};

export { Settings };