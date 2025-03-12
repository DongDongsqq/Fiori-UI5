sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("exercised0208.controller.View1", {
        onInit() {
            var oData = {
                salesData: [
                    { month: "2023-01", sales: 12000 },
                    { month: "2023-02", sales: 14000 },
                    { month: "2023-03", sales: 15000 },
                    { month: "2023-04", sales: 13000 },
                    { month: "2023-05", sales: 16000 },
                    { month: "2023-06", sales: 17000 }
                ]
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "chart");

            var oData2 = {
                data: [
                    { category: "A등급", value: 50 },
                    { category: "B등급", value: 65 },
                    { category: "C등급", value: 75 },
                    { category: "D등급", value: 40 }
                ]
            };
            var oModel2 = new JSONModel(oData2);
            this.getView().setModel(oModel2, "chart2");
        }
    });
});