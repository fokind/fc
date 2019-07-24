sap.ui.define(["ui5lab/fc/ChartItem", "ui5lab/fc/library"], function(
  ChartItem
) {
  "use strict";

  return ChartItem.extend("ui5lab.fc.Candle", {
    metadata: {
      properties: {
        open: "float",
        high: "float",
        low: "float",
        close: "float"
      }
    }
  });
});
