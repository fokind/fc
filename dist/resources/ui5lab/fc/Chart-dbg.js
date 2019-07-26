/* global d3 */

sap.ui.define(
  ["sap/ui/core/Control", "sap/ui/core/ResizeHandler", "ui5lab/fc/library", "ui5lab/fc/thirdparty/d3"],
  function(Control, ResizeHandler) {
    "use strict";

    return Control.extend("ui5lab.fc.Chart", {
      metadata: {
        library: "ui5lab.fc",
        properties: {
          height: "string",
          padding: "string",
          start: "string",
          end: "string",
          timeframe: "string"
        },
        aggregations: {
          items: { type: "ui5lab.fc.ChartItem", multiple: true }
        },
        defaultAggregation: "items"
      },

      init: function() {
        this._fPaddingTop = 0;
        this._fPaddingRight = 0;
        this._fPaddingBottom = 0;
        this._fPaddingLeft = 0;

        var oControl = this;
        ResizeHandler.register(oControl, function(oEvent) {
          oControl._onResize(oEvent);
        }); // точно сработает один раз при первом запуске
      },

      _onResize: function(oEvent) {
        var oControl = this;
        var div = d3.select("#" + oControl.getId());
        var fWidth = oEvent.size.width;
        var fHeight = oEvent.size.height;

        var fPaddingTop = oControl._fPaddingTop;
        var fPaddingLeft = oControl._fPaddingLeft;

        var svg = div
          .select("svg")
          .attr("width", fWidth)
          .attr("height", fHeight - 4); // по какой-то причине именно с такой поправкой работает корректно

        svg
          .select(".fcPlotArea")
          .attr("transform", `translate(${fPaddingLeft}, ${fPaddingTop})`)
          .attr("width", fWidth - fPaddingLeft - oControl._fPaddingRight)
          .attr("height", fHeight - oControl._fPaddingBottom - fPaddingTop);
      },

      // без этого связывается только 100 элементов
      bindAggregation: function(sKey, oBindingInfo) {
        if (!oBindingInfo.length) oBindingInfo.length = 1000000; // Max number of lines to display
        return sap.ui.core.Control.prototype.bindAggregation.apply(
          this,
          arguments
        ); //call superclass
      },

      setPadding: function(sValue) {
        var aPadding = sValue.split(" ");
        var iPaddingLength = aPadding.length;

        this._fPaddingTop = +aPadding[0];
        this._fPaddingRight = +aPadding[iPaddingLength === 1 ? 0 : 1];
        this._fPaddingBottom = +aPadding[iPaddingLength < 3 ? 0 : 2];
        this._fPaddingLeft = +aPadding[
          iPaddingLength === 1 ? 0 : iPaddingLength === 4 ? 3 : 1
        ];

        this.setProperty("padding", sValue, true);
      },

      getTimeScale: function() {
        var div = d3.select("#" + this.getId());
        var svg = div.select("svg");
        var plotArea = svg.select(".fcPlotArea");
        var fPlotAreaWidth = +plotArea.attr("width");
        var dMin = moment(this.getStart()).toDate();
        var dMax = moment(this.getEnd())
          .add(1, "m")
          .toDate();

        return d3
          .scaleTime()
          .range([0, fPlotAreaWidth])
          .domain([dMin, dMax]);
      },

      getYScale: function(fMin, fMax) {
        var div = d3.select("#" + this.getId());
        var svg = div.select("svg");
        var plotArea = svg.select(".fcPlotArea");
        var fPlotAreaHeight = +plotArea.attr("height");
        return d3
          .scaleLinear()
          .range([fPlotAreaHeight, 0])
          .domain([fMin, fMax]);
      }
    });
  }
);
