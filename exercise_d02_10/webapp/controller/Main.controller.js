sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("exercised0210.controller.Main", {
        onInit() {
this.oRouter = this.getOwnerComponent().getRouter();
        },
        onGoDetail() {
            //input 필드에 들어오는 값 찾기 -> 매개변수로 전달하기
            let sValue = this.getView().byId("idInput").getValue(); //뷰의 input id로 값 가져오기
            this.oRouter.navTo("RouteDetail", { //manifest에 적은 route이름과 동일
                key1: sValue, //input 필드에 들어오는 값
                key2: 100
            }, true);
        }
    });
});