import { draw_bar_chart, getMappedSdgData } from "./chart/bar.js";
import { SDGS_COLORS } from "./constants.js";

export function draws(weight_project) {
  draw_bar_chart({
    elementId: "observablehq-chart-b9eea16e1",
    title: "永續指標",
    data: getMappedSdgData(weight_project),
    backgroundColor: SDGS_COLORS,
    skipZero: true,
    titlePosition: "bottom",
    titleFontSize: 16,
  });
}

export function addWeight(w1, w2) {
  const combined = [w1, w2].reduce((a, obj) => {
    Object.entries(obj).forEach(([key, val]) => {
      a[key] = (parseInt(a[key]) || 0) + parseInt(val);
    });
    return a;
  });

  return combined;
}
