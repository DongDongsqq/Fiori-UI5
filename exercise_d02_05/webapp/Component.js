sap.ui.define(
  ["sap/ui/core/UIComponent", "sync/d02/exercised0205/model/models"],
  (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("sync.d02.exercised0205.Component", {
      metadata: {
        manifest: "json",
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
      },

      init() {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // set the device model
        this.setModel(models.createDeviceModel(), "device");

        // set the data model
        this.setModel(models.createDataModel(), "data");

        // enable routing
        this.getRouter().initialize();
      },
    });
  }
);
