sap.ui.define(["./SeriesItem", "./library"], function(SeriesItem) {
  "use strict";

  return SeriesItem.extend("openui5.fc.Candle", {
    metadata: {
      properties: {
        open: "float",
        high: "float",
        low: "float",
        close: "float"
      }
    },

    _getMin: function() {
      return this.getLow();
    },

    _getMax: function() {
      return this.getHigh();
    }
  });
});
