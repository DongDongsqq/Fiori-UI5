sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "syncd02/mento1/model/formatter",
    "sap/ui/model/resource/ResourceModel",
  ],
  function (Controller, formatter, ResourceModel) {
    "use strict";

    return Controller.extend("syncd02.mento1.controller.ProductList", {
      formatter: formatter,

      onInit: function () {
        // set i18n model on view
        const i18nModel = new ResourceModel({
          bundleName: "ui5.walkthrough.i18n.i18n",
        });
        this.getView().setModel(i18nModel, "i18n");
      },
    });
  }
);
