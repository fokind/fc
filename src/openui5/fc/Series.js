/* global d3 */

sap.ui.define(
  ["sap/ui/core/Control", "openui5/fc/library", "openui5/fc/thirdparty/d3"],
  function(Control) {
    "use strict";

    return Control.extend("openui5.fc.Series", {
      metadata: {
        library: "openui5.fc",
        properties: {
          _max: "string",
          _min: "string"
        },
        aggregations: {
          items: { type: "openui5.fc.SeriesItem", multiple: true }
        },
        defaultAggregation: "items",
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

      setItems: function(oValue) {
        this.getParent()._draw();
        this.setAggregation("items", oValue, true);
      },

      addItem: function(oValue) {
        var oParent = this.getParent();

        oValue.attachMinChange(function(oEvent) {
          var fValue = oEvent.getParameter("value");
          var fMin = oParent.getMin();
          fMin = fMin ? Math.min(fMin, fValue) : fValue;
          oParent.setMin(fMin);
        });

        oValue.attachMaxChange(function(oEvent) {
          var fValue = oEvent.getParameter("value");
          var fMax = oParent.getMax();
          fMax = fMax ? Math.max(fMax, fValue) : fValue;
          oParent.setMax(fMax);
        });
        oParent._draw();
        this.addAggregation("items", oValue, true);
      },

      insertItem: function(oValue) {
        this.getParent()._draw();
        this.insertAggregation("items", oValue, true);
      },

      removeAllItems: function() {
        this.getParent()._draw();
        this.removeAllAggregation("items", true);
      },

      removeItem: function(oValue) {
        this.getParent()._draw();
        this.removeAggregation("items", oValue, true);
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
  }
);
