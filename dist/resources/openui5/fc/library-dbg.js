sap.ui.define(["jquery.sap.global", "sap/ui/core/library"], function() {
  "use strict";

  sap.ui.getCore().initLibrary({
    name: "openui5.fc",
    dependencies: ["sap.ui.core", "sap.m"],
    types: [],
    interfaces: [],
    controls: [
      "openui5.fc.Candle",
      "openui5.fc.CandlestickChart",
      "openui5.fc.Chart",
      "openui5.fc.LineChart",
      "openui5.fc.LineChartItem",
      "openui5.fc.Series",
      "openui5.fc.SeriesItem",
      "openui5.fc.SteppedLineChart",
      "openui5.fc.TimeAxis",
      "openui5.fc.ValueAxis"
    ],
    elements: [],
    noLibraryCSS: false,
    version: "1.0.2-alpha.1"
  });

  return openui5.fc;
});
