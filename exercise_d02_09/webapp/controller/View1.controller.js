sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel"
], function (Controller, ODataModel, JSONModel) {
    "use strict";

    return Controller.extend("exercised0209.controller.View1", {
        onInit() {
            var oDataModel = new ODataModel("/v2/northwind/northwind.svc/");
            
            oDataModel.read("/Products", {
                urlParameters: {
                    "$orderby": "UnitsInStock desc",
                    "$top": "5"
                },
                success: function (oData) {
                    var aProducts = oData.results.map(function (product) {
                        return {
                            ProductID: product.ProductID,
                            ProductName: product.ProductName,
                            UnitsInStock: product.UnitsInStock,
                            name: product.ProductID + " " + product.ProductName
                        };
                    });
                    var oJsonModel = new JSONModel({ product: aProducts });
                    this.getView().setModel(oJsonModel, "Product");
                }.bind(this),
                error: function (oError) {
                    console.error("Error fetching data", oError);
                }
            });
            
            
        }
    });
});
