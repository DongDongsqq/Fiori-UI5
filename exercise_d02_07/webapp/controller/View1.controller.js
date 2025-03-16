// sap.ui.define 모듈 정의: 해당 모듈은 Controller, ODataModel, JSONModel 모듈을 의존성으로 사용함
sap.ui.define(
  // 의존성 배열: SAP UI5 Controller, ODataModel(v2 버전), JSONModel 모듈을 로드함
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
  ],
  // 위 모듈들이 매개변수로 전달됨 (순서대로 Controller, ODataModel, JSONModel)
  (Controller, ODataModel, JSONModel) => {
    "use strict"; // 엄격 모드 적용 (더 엄격한 문법 검사를 수행)

    // Controller 확장: 새로운 컨트롤러(exercised0207.controller.View1)를 정의
    return Controller.extend("exercised0207.controller.View1", {
      // onInit: 컨트롤러 초기화 시 실행되는 메서드
      onInit() {
        // ODataModel 생성: 백엔드 OData 서비스 경로를 지정 (경로는 manifest.json의 dataSources에 설정되어 있음)
        var oModel = new ODataModel("/sap/opu/odata/sap/ZCAR_D02_SRV/");
        // 현재 뷰에 생성한 ODataModel을 설정하여 모델 바인딩을 준비함
        this.getView().setModel(oModel);
      },

      // onCreate: 새로운 항목(데이터)를 생성하는 이벤트 핸들러
      onCreate() {
        // 현재 뷰에 설정된 모델을 가져옴
        var oModel = this.getView().getModel();
        // 사용자 입력 필드에서 값을 추출 (항공사 ID, 항공사 이름, 통화 코드, URL)
        var carrid = this.getView().byId("input_carrid").getValue();
        var carrname = this.getView().byId("input_carrname").getValue();
        var currcode = this.getView().byId("input_currcode").getValue();
        var url = this.getView().byId("input_url").getValue();

        // 생성할 데이터 엔트리를 JSON 객체 형태로 구성
        var oEntry = {
          Carrid: carrid, // 항공사 ID
          Carrname: carrname, // 항공사 이름
          Currcode: currcode, // 통화 코드
          Url: url, // URL 정보
        };

        // ODataModel의 create 메서드를 호출하여 새로운 데이터를 백엔드에 전송
        oModel.create("/ZCARR_D02Set", oEntry, {
          // 데이터 생성 성공 시 실행되는 콜백 함수
          success: function () {
            sap.m.MessageToast.show("항공사 데이터 생성 성공"); // 성공 메시지 표시
            oModel.refresh(); // 모델을 새로고침하여 변경된 데이터를 반영
          },
          // 데이터 생성 실패 시 실행되는 콜백 함수
          error: function () {
            sap.m.MessageToast.show("데이터 생성 오류"); // 오류 메시지 표시
          },
        });
      },

      // ------OnDelete--------------------------------------------------------------------
      // onDelete: 선택한 항목을 삭제하는 이벤트 핸들러
      onDelete() {
        // 테이블("mTable") 컨트롤을 가져옴
        var oTable = this.getView().byId("mTable");
        // 테이블에서 현재 선택된 항목을 가져옴
        var oSelectedItem = oTable.getSelectedItem();

        // 선택된 항목이 없으면 사용자에게 선택 요청 메시지를 표시 후 함수 종료
        if (!oSelectedItem) {
          sap.m.MessageToast.show("삭제할 항목을 선택해주세요.");
          return;
        }

        // 선택된 항목의 바인딩 컨텍스트 경로를 가져옴 (삭제할 데이터의 경로)
        var sPath = oSelectedItem.getBindingContext().getPath();
        // 현재 뷰에 설정된 ODataModel을 가져옴
        var oModel = this.getView().getModel();

        // ODataModel의 remove 메서드를 호출하여 해당 경로의 데이터를 삭제
        oModel.remove(sPath, {
          // 삭제 성공 시 콜백 함수
          success: function () {
            sap.m.MessageToast.show("항공사 데이터 삭제 성공"); // 성공 메시지 표시
            oTable.removeSelections(); // 테이블의 선택 상태 초기화
            oModel.refresh(); // 모델 새로고침하여 변경 사항 반영
          },
          // 삭제 실패 시 콜백 함수
          error: function () {
            sap.m.MessageToast.show("데이터 삭제 오류"); // 오류 메시지 표시
          },
        });
      },

      // ------OnOpenDialog--------------------------------------------------------------------
      // onOpenDialog: 데이터를 수정하기 위한 대화상자(팝업)를 여는 이벤트 핸들러
      async onOpenDialog() {
        // 테이블("mTable") 컨트롤을 가져옴
        var oTable = this.getView().byId("mTable");
        // 테이블에서 현재 선택된 항목을 가져옴
        var oSelectedItem = oTable.getSelectedItem();

        // 선택된 항목이 없으면 사용자에게 선택 요청 메시지를 표시 후 함수 종료
        if (!oSelectedItem) {
          sap.m.MessageToast.show("변경할 항목을 선택해주세요.");
          return;
        }

        // 선택된 항목의 바인딩 컨텍스트를 가져옴
        var oBindingContext = oSelectedItem.getBindingContext();
        // 컨텍스트에서 데이터를 객체 형태로 추출
        var oData = oBindingContext.getObject();

        // 업데이트를 위한 JSONModel 생성: 선택된 항목의 데이터를 복사하여 대화상자에 바인딩
        const oUpdateModel = new JSONModel({
          Carrid: oData.Carrid, // 항공사 ID
          Carrname: oData.Carrname, // 항공사 이름
          Currcode: oData.Currcode, // 통화 코드
          Url: oData.Url, // URL 정보
          Name: oData.Name, // 기타 이름 정보
          Date: oData.Date, // 날짜 정보
          Time: oData.Time, // 시간 정보
        });
        // 프래그먼트를 아직 로드하지 않았다면, 해당 프래그먼트("UpdateDialog")를 비동기적으로 로드
        if (!this.oDialog) {
          this.oDialog = await this.loadFragment({
            name: "exercised0207.view.UpdateDialog", // 프래그먼트 경로 및 이름 지정
            Controller: this, // 현재 컨트롤러를 프래그먼트 컨트롤러로 지정
          });
        }
        // 로드한 대화상자에 업데이트용 JSONModel을 "updateview"라는 이름의 모델로 설정
        this.oDialog.setModel(oUpdateModel, "updateview");
        // 대화상자를 열어 사용자에게 수정 인터페이스를 제공
        this.oDialog.open();
      },

      // onCloseDialog: 대화상자를 닫는 이벤트 핸들러
      onCloseDialog() {
        this.oDialog.close(); // 대화상자 닫기
        sap.m.MessageToast.show("데이터 수정 취소"); // 취소 메시지 표시
      },

      // ------OnUpdate--------------------------------------------------------------------
      // onUpdate: 대화상자에서 입력된 데이터를 기반으로 백엔드 데이터를 업데이트하는 이벤트 핸들러
      onUpdate() {
        // 테이블("mTable") 컨트롤을 가져옴
        var oTable = this.getView().byId("mTable");
        // 테이블에서 선택된 항목을 가져옴
        var oSelectedItem = oTable.getSelectedItem();
        // 선택된 항목의 바인딩 컨텍스트 경로를 가져옴 (업데이트 대상 데이터의 경로)
        var sPath = oSelectedItem.getBindingContext().getPath();
        // 백엔드 업데이트를 위해 현재 뷰의 ODataModel을 가져옴
        var oODataModel = this.getView().getModel();

        // 대화상자에 바인딩된 JSONModel("updateview")에서 업데이트할 데이터를 가져옴
        var oUpdateModel = this.oDialog.getModel("updateview");

        // 업데이트할 데이터를 JSON 객체 형태로 구성 (예시로 항공사 이름과 URL만 업데이트)
        var oEntry = {
          Carrname: oUpdateModel.getProperty("/Carrname"), // 수정된 항공사 이름
          Url: oUpdateModel.getProperty("/Url"), // 수정된 URL 정보
        };

        // ODataModel의 update 메서드를 호출하여 백엔드 데이터를 업데이트
        oODataModel.update(sPath, oEntry, {
          // 업데이트 성공 시 콜백 함수
          success: function () {
            sap.m.MessageToast.show("항공사 데이터 수정 성공"); // 성공 메시지 표시
            oODataModel.refresh(); // 변경 사항 반영을 위해 모델 새로고침
          },
          // 업데이트 실패 시 콜백 함수
          error: function () {
            sap.m.MessageToast.show("데이터 수정 오류"); // 오류 메시지 표시
          },
        });

        // 업데이트 후 대화상자를 닫음
        this.oDialog.close();
      },
    });
  }
);
