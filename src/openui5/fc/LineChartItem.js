sap.ui.define(["openui5/fc/SeriesItem", "./library"], function(SeriesItem) {
  "use strict";

  return SeriesItem.extend("openui5.fc.LineChartItem", {
    metadata: {
      properties: {
        value: "float"
      }
    },

    setValue: function(fValue) {
      this.setProperty("value", fValue);
      this.fireEvent("minChange", { value: fValue });
      this.fireEvent("maxChange", { value: fValue });
    }
  });
});
