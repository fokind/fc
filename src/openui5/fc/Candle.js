sap.ui.define(["openui5/fc/SeriesItem", "openui5/fc/library"], function(
  SeriesItem
) {
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

    setLow: function(fValue) {
      this.setProperty("low", fValue);
      this.fireEvent("minChange", { value: fValue });
    },

    setHigh: function(fValue) {
      this.setProperty("high", fValue);
      this.fireEvent("maxChange", { value: fValue });
    }
  });
});
