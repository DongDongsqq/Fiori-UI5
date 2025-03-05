sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("walkThrough.controller.InvoiceList", {
      onInit() {
        this.getView().setModel(oViewModel, "view");
      },
    });
  }
);
