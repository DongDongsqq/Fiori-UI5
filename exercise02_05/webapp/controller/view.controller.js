sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("sync.d02.exercise0205.controller.view", {
      onInit() {},

      onPress() {
        // JSON 모델에서 입력 필드의 값을 가져옴
        const oModel = this.getView().getModel();
        const sValue = oModel.getProperty("/inputValue");

        if (!sValue) {
          MessageToast.show("메시지 입력 바랍니다.");
        } else {
          // MessageToast로 메시지 출력
          MessageToast.show(sValue);
        }
      },
    });
  }
);
