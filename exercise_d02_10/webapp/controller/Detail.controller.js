sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("exercised0210.controller.Detail", {
        onInit() {
        },
        onGoBack() {
            this.getOwnerComponent().getRouter().navTo("RouteMain", {
                "?query": {
                    key1: "okok",
                    key2: 123
                } //pattern의 쿼리와 동일하게 해서 값을 입력함 ==> parameter로 활용
            }, true);
        }
    });
});