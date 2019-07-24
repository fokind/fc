sap.ui.define(["ui5lab/fc/ChartItem", "ui5lab/fc/library"], function(
  ChartItem
) {
  "use strict";

  return ChartItem.extend("ui5lab.fc.indicator.CCITItem", {
    metadata: {
      properties: {
        y: "float"
      }
    }
  });
});