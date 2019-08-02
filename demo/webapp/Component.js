sap.ui.define(["sap/ui/core/UIComponent"], function(UIComponent) {
  "use strict";

  return UIComponent.extend("openui5.demo.Component", {
    metadata: {
      manifest: "json"
    },

    init: function() {
      UIComponent.prototype.init.apply(this, arguments);

      var oViewModel = this.getModel("view");
      oViewModel.setData({
        start: "2019-07-22T00:00:00",
        end: "2019-07-22T23:59:00",
        max: "0.021351"
      });

      // setTimeout(() => {
      //   oViewModel.setProperty("/start", "2019-07-23T00:00:00");
      //   oViewModel.setProperty("/end", "2019-07-23T23:59:00");
      //   oViewModel.setProperty("/max", "0.022");
      // }, 3000);

      var oModel = this.getModel();
      var sUri = "./data/buffer.json";
      setTimeout(() => {
        oModel.loadData(sUri);
      }, 1);
    }
  });
});
