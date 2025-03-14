sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",

], function(Controller, Fragment, JSONModel) {
    "use strict";

    return Controller.extend("exercised0211.controller.View", {
        onInit: function() {
            var oModel = new JSONModel();
            oModel.loadData("/data.json");
            this.getView().setModel(oModel, "dataModel");

            // 프래그먼트를 미리 로드하여 this.oDialog에 저장 (성능 최적화를 위해 단 한번만 fragment 로드 하기 위함)
            if (!this.oDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "exercised0211.view.Detail",
                    controller: this
                }).then(function(oDialog) {
                    this.oDialog = oDialog;
                    this.getView().addDependent(this.oDialog);
                }.bind(this));
            }
        },

        onDetails: async function(oEvent) {
            // 버튼의 binding context를 통해 해당 행의 데이터를 가져옴
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext("dataModel");
            var oData = oContext.getObject();
            console.log("선택된 데이터:", oData);

            // 선택된 데이터를 담은 새로운 모델 생성 후 다이얼로그에 설정
            var oUpdateModel = new JSONModel(oData);
            if (!this.oDialog) {
                this.oDialog = await Fragment.load({
                    id: this.getView().getId(),
                    name: "exercised0211.view.Detail",
                    controller: this
                });
                this.getView().addDependent(this.oDialog);
            }
            this.oDialog.setModel(oUpdateModel, "detailModel");
            this.oDialog.open();
        },

        onCloseDialog: function() {
            this.oDialog.close();

        }
    });
});
