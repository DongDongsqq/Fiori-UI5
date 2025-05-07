sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
    "use strict";

    return Controller.extend("cl4.exprogramd02.controller.Detail", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);

        },
        onGoBack() {
            this.oRouter.navTo("RouteView1", {}, true);
        },


        _onPatternMatched(oEvent) {
            // URL 에서 전달된 파라미터 가져오기
            // ?query로 전달된 값 가져오기
            var oQuery = oEvent.getParameter("arguments")["?query"];
            var oModel = new JSONModel(oQuery);
            console.log(oModel);

            //뷰에 "detailModel"로 모델 설정
            this.getView().setModel(oModel, "detailModel"); 
            console.log(this.getView());
        },

        onGoBack: function() { //뒤로가기 버튼 함수
            this.getOwnerComponent().getRouter().navTo("RouteView1", {
            }, true);
        }
    });
});
