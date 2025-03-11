sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/resource/ResourceModel",
        "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("mento2.controller.View1", {
        onInit() {
        },
        onFilterOrders: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue");
            var oList = this.getView().byId("orderList");
            var oBinding = oList.getBinding("items");

            var aFilters = [];
            if (sQuery && sQuery.length > 0) {
                var oFilter = new Filter("status", FilterOperator.EQ, sQuery);
                aFilters.push(oFilter);
            }

            oBinding.filter(aFilters);
        }
    });
});