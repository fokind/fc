sap.ui.define(["./SeriesItem", "./library"], function(SeriesItem) {
  "use strict";

  return SeriesItem.extend("openui5.fc.LineChartItem", {
    metadata: {
      properties: {
        value: "float"
      }
    },

    _getMin: function() {
      return this.getValue();
    },

    _getMax: function() {
      return this.getValue();
    }
  });
});
