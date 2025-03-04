sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("sync.d02.exercised0205.controller.view", {
      onInit() {
        // 초기화 함수
      },

      onPress() {
        const inputValue = this.getView()
          .getModel("data")
          .getProperty("/input");
        const message = inputValue ? inputValue : "메시지 입력바랍니다.";
        MessageToast.show(message);
      },
    });
  }
);
