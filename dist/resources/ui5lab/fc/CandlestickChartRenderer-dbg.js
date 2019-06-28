sap.ui.define(
  [],
  function() {
    "use strict";

    return {
      renderer: function(oRm, oControl) {
        oRm.write("<svg");
        oRm.writeControlData(oControl);
        oRm.write(
          "><g class='fcChart sapUiChartGood'><g class='fcAxisLeft'></g><g class='fcAxisBottom'></g><g class='fcPlotArea'></g></g></svg>"
        );
        // d3 применяется только после рендера UI5
      }
    };
  },
  /* bExport= */ true
);
