/* global d3 */

sap.ui.define(
  ["sap/ui/core/Control", "openui5/fc/library", "openui5/fc/thirdparty/d3"],
  function(Control) {
    "use strict";

    return Control.extend("openui5.fc.ValueAxis", {
      metadata: {
        library: "openui5.fc",
        properties: {
          max: "string",
          min: "string"
        }
      },

      init: function() {
        this._scale = d3.scaleLinear();
      },

      _draw: function() {
        var oControl = this;
        var oParent = oControl.getParent();

        var div = d3.select("#" + oParent.getId());
        var fHeight = div.node().offsetHeight;

        var fPaddingTop = oParent._fPaddingTop;
        var fPaddingLeft = oParent._fPaddingLeft;

        var fPlotAreaHeight = fHeight - oParent._fPaddingBottom - fPaddingTop;

        var scale = oControl._scale
          .range([fPlotAreaHeight, 0])
          .domain([+oControl.getMin(), +oControl.getMax()]);

        d3.select("#" + oControl.getId())
          .attr("transform", `translate(${fPaddingLeft}, ${fPaddingTop})`)
          .call(d3.axisLeft(scale));
      }
    });
  }
);
