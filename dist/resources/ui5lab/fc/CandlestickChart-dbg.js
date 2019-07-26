/* global d3 moment */

sap.ui.define(
  [
    "ui5lab/fc/Chart",
    "ui5lab/fc/library",
    "ui5lab/fc/thirdparty/d3",
    "ui5lab/fc/thirdparty/moment-with-locales"
  ],
  function(Chart) {
    "use strict";

    return Chart.extend("ui5lab.fc.CandlestickChart", {
      metadata: {
        aggregations: {
          items: { type: "ui5lab.fc.Candle", multiple: true }
        }
      },

      renderer: {},

      _onResize: function(oEvent) {
        var oControl = this;

        Chart.prototype._onResize.apply(oControl, [oEvent]);

        var aItems = oControl.getItems();
        if (!aItems || aItems.length < 2) return;

        // подготовка переменных
        var fMin = d3.min(aItems, e => e.getLow());
        var fMax = d3.max(aItems, e => e.getHigh());
        var fCandleBodyWidth = 0.8; // TODO заменить на ось категорий

        // подготовка пространства
        var div = d3.select("#" + oControl.getId());
        var svg = div.select("svg");
        var plotArea = svg.select(".fcPlotArea");
        var fPlotAreaHeight = +plotArea.attr("height");

        // шкала x
        var sStart = oControl.getStart();
        var sEnd = oControl.getEnd();
        var dMinX = moment(sStart).toDate();
        var iTimeframe = +oControl.getTimeframe();

        var xScale = oControl.getTimeScale();

        // ось x
        svg
          .select(".fcAxisBottom")
          .attr("transform", `translate(0, ${fPlotAreaHeight})`)
          .call(d3.axisBottom(xScale));

        var fTickWidth = xScale(
          moment(dMinX)
            .add(iTimeframe, "m")
            .toDate()
        );

        // шкала y
        var yScale = oControl.getYScale(fMin, fMax);

        // ось y
        svg.select(".fcAxisLeft").call(d3.axisLeft(yScale));

        // область отображения данных
        var series = plotArea.select(".fcSeries");
        series.selectAll("*")
          .remove();

        var candles = series
          .selectAll()
          .data(aItems)
          .enter()
          .filter(e => moment(e.getTime()).isBetween(sStart, sEnd, 'm', '[]'))
          .append("g")
          .classed("fcBullish", e => e.getClose() >= e.getOpen())
          .classed("fcBearish", e => e.getClose() < e.getOpen());

        // тень свечи
        candles
          .append("line")
          .classed("fcCandleShadow", true)
          .attr(
            "x1",
            e => xScale(moment(e.getTime()).toDate()) + fTickWidth / 2
          )
          .attr(
            "x2",
            e => xScale(moment(e.getTime()).toDate()) + fTickWidth / 2
          )
          .attr("y1", e => yScale(e.getHigh()))
          .attr("y2", e => yScale(e.getLow()));

        // тело свечи
        candles
          .append("rect")
          .classed("fcCandleBody", true)
          .attr(
            "x",
            e =>
              xScale(moment(e.getTime()).toDate()) +
              ((1 - fCandleBodyWidth) * fTickWidth) / 2
          )
          .attr("y", e => yScale(Math.max(e.getOpen(), e.getClose())))
          .attr("height", e =>
            Math.max(
              1,
              yScale(Math.min(e.getOpen(), e.getClose())) -
                yScale(Math.max(e.getOpen(), e.getClose()))
            )
          )
          .attr("width", fCandleBodyWidth * fTickWidth);
      }
    });
  }
);
