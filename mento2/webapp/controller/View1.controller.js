sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
], function (Controller, Filter, FilterOperator, Fragment, JSONModel) {
    "use strict";

    return Controller.extend("mento2.controller.View1", {
        onInit() {
            var oModel = new sap.ui.model.json.JSONModel({
                currency: "KRW"
            });
            this.getView().setModel(oModel);


            // 다이얼로그를 로드합니다.
            if (!this.oDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "mento2.view.deliver",
                    controller: this
                }).then(function (oDialog) {
                    this.oDialog = oDialog;
                    this.getView().addDependent(this.oDialog);
                }.bind(this));
            }
        },

        onFilterOrders: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue");
            var oList = this.getView().byId("orderList");
            var oBinding = oList.getBinding("items");

            var aFilters = [];
            if (sQuery && sQuery.length > 0) {
                var oFilter = new Filter("product", FilterOperator.StartsWith, sQuery);
                aFilters.push(oFilter);
            }

            oBinding.filter(aFilters);
        },

        async onOpenDeliver() {
            if (!this.oDialog) {
                this.oDialog = await this.loadFragment({
                    name: "mento2.view.deliver",
                    controller: this
                });
                this.getView().addDependent(this.oDialog);
            }

            var oList = this.byId("orderList3");
            var oBinding = oList.getBinding("items");

            var aFilters = [];
            var oFilter = new Filter("quantity", FilterOperator.LT, 5);
            aFilters.push(oFilter);

            oBinding.filter(aFilters);
            this.oDialog.open();
        },

        onCloseDialog() {
            this.oDialog.close();
        }
    });
});