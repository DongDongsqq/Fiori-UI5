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
                success: function (oData) {
                    var aProducts = oData.results.map(function (product) {
                        return {
                            ProductID: product.ProductID,
                            ProductName: product.ProductName,
                            UnitsInStock: product.UnitsInStock,
                            // 미리 계산된 값 추가
                            name: product.ProductID + " " + product.ProductName
                        };
                    });

                    // UnitsInStock 기준 오름차순 정렬 후 상위 5개만 추출
                    var aTopFiveProducts = aProducts
                        .sort((a, b) => b.UnitsInStock - a.UnitsInStock)
                        .slice(0, 5);

                    var oJsonModel = new JSONModel({ Product: aTopFiveProducts });
                    this.getView().setModel(oJsonModel, "Product");
                }.bind(this),
                error: function (oError) {
                    console.error("Error fetching data", oError);
                }
            });
        }
    });
});
