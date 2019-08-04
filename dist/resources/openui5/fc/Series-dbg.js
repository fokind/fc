/* global d3 */

sap.ui.define(["sap/ui/core/Control", "./library", "./thirdparty/d3"], function(
  Control
) {
  "use strict";

  return Control.extend("openui5.fc.Series", {
    metadata: {
      library: "openui5.fc",
      aggregations: {
        items: { type: "openui5.fc.SeriesItem", multiple: true }
      },
      defaultAggregation: "items"
    },

    addItem: function(oValue) {
      this.addAggregation("items", oValue, true);
    },

    removeItem: function(oValue) {
      this.removeAggregation("items", oValue, true);
    },

    _getMin: function() {
      var aItems = this.getItems();
      return d3.min(aItems, function(e) {
        return e._getMin();
      });
    },

    _getMax: function() {
      var aItems = this.getItems();
      return d3.max(aItems, function(e) {
        return e._getMax();
      });
    },

    _draw: function() {
      var oControl = this;
      var oParent = oControl.getParent();
      d3.select("#" + oControl.getId())
        .attr(
          "transform",
          `translate(${oParent._fPaddingLeft}, ${oParent._fPaddingTop})`
        )
        .selectAll("*")
        .remove();
    }
  });
});
