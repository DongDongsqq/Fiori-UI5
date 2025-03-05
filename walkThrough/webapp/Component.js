sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel"],
  (UIComponent, JSONModel) => {
    "use strict";

    return UIComponent.extend("ui5.walkthrough.Component", {
      metadata: {
        // 비동기 콘텐츠 생성을 위한 인터페이스 설정
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
        // manifest 파일을 JSON 형식으로 설정
        manifest: "json",
      },

      init() {
        // 부모의 init 함수를 호출
        UIComponent.prototype.init.apply(this, arguments);

        // 데이터 모델 설정
        const oData = {
          recipient: {
            name: "World", // 초기 이름 설정
          },
        };
        const oModel = new JSONModel(oData);
        this.setModel(oModel); // 모델을 컴포넌트에 설정
      },
    });
  }
);
