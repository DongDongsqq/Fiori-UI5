sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend("sync.d02.exercised0206.controller.StudentList", {
    onInit: function () {
      const oViewModel = new sap.ui.model.json.JSONModel({});
      this.getView().setModel(oViewModel, "view");
    },
  });
});
