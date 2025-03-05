sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sync/d02/exercise0205/model/models",
  ],
  (UIComponent, JSONModel, models) => {
    "use strict";

    return UIComponent.extend("sync.d02.exercise0205.Component", {
      metadata: {
        manifest: "json",
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
      },

      init() {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // set the device model
        this.setModel(models.createDeviceModel(), "device");

        // create and set the JSON model
        const oData = {
          inputValue: "",
        };
        const oModel = new JSONModel(oData);
        this.setModel(oModel);

        // enable routing
        this.getRouter().initialize();
      },
    });
  }
);
