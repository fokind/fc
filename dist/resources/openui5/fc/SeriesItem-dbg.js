sap.ui.define(["sap/ui/core/Control", "./library"], function(Control) {
  "use strict";

  return Control.extend("openui5.fc.SeriesItem", {
    metadata: {
      library: "openui5.fc",
      properties: {
        time: "string"
      },
      events: {
        minChange: {
          parameters: {
            value: { type: "string" }
          }
        },
        maxChange: {
          parameters: {
            value: { type: "string" }
          }
        }
      }
    },

    renderer: {}
  });
});
