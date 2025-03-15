// SAPUI5 모듈 정의: Controller, Fragment, JSONModel을 가져옵니다.
sap.ui.define(
  [
    "sap/ui/core/mvc/Controller", // MVC Controller 기능을 제공하는 모듈
    "sap/ui/core/Fragment", // Fragment(부분 뷰) 로딩을 위한 모듈
    "sap/ui/model/json/JSONModel", // JSON 형식의 데이터를 다루는 모델 모듈
  ],
  function (Controller, Fragment, JSONModel) {
    "use strict"; // 엄격 모드 사용

    // 새로운 컨트롤러를 확장하여 반환합니다.
    return Controller.extend("exercised0211.controller.View", {
      // onInit: 컨트롤러 초기화 시 호출되는 함수
      onInit: function () {
        // JSONModel 인스턴스를 생성합니다.
        var oModel = new JSONModel();
        // 외부 JSON 파일(/data.json)에서 데이터를 로드합니다.
        oModel.loadData("/data.json");
        // 데이터 로드 완료 후 실행할 콜백 함수 등록
        oModel.attachRequestCompleted(function () {
          // 로드된 데이터를 가져옵니다.
          var oData = oModel.getData();
          // 데이터에 기본 선택값 "전체"를 추가합니다.
          oData.selectedGender = "전체";
          // 수정된 데이터를 모델에 다시 설정합니다.
          oModel.setData(oData);
        });
        // 현재 뷰에 "dataModel" 이름으로 JSON 모델을 설정합니다.
        this.getView().setModel(oModel, "dataModel");

        // 프래그먼트(부분 뷰)를 미리 로드하여 this.oDialog에 저장합니다.
        // (이렇게 하면 나중에 Dialog를 열 때 성능 최적화에 도움이 됩니다.)
        if (!this.oDialog) {
          Fragment.load({
            // 현재 뷰의 ID를 프래그먼트 ID에 사용
            id: this.getView().getId(),
            // 로드할 프래그먼트의 이름 지정
            name: "exercised0211.view.Detail",
            // 현재 컨트롤러를 프래그먼트의 컨트롤러로 지정
            controller: this,
          }).then(
            function (oDialog) {
              // 로드된 Dialog 객체를 this.oDialog에 저장
              this.oDialog = oDialog;
              // 현재 뷰의 종속 객체로 추가하여 뷰와 함께 lifecycle이 관리되도록 함
              this.getView().addDependent(this.oDialog);
            }.bind(this)
          ); // 컨텍스트(this)를 현재 컨트롤러로 바인딩
        }
      },

      // onDetails: 테이블 행의 "Details" 버튼 클릭 시 호출되는 함수 (비동기 함수)
      onDetails: async function (oEvent) {
        // 클릭한 버튼 객체를 가져옵니다.
        var oButton = oEvent.getSource();
        // 버튼의 binding context를 통해 선택한 행의 데이터를 가져옵니다.
        var oContext = oButton.getBindingContext("dataModel");
        // 선택한 행의 데이터를 객체 형태로 가져옴
        var oData = oContext.getObject();
        // 콘솔에 선택된 데이터를 출력합니다.
        console.log("선택된 데이터:", oData);

        // 선택된 데이터를 담은 새로운 JSONModel을 생성합니다.
        var oUpdateModel = new JSONModel(oData);
        // 만약 Dialog가 아직 로드되지 않았다면, 프래그먼트를 비동기로 로드합니다.
        if (!this.oDialog) {
          this.oDialog = await Fragment.load({
            id: this.getView().getId(),
            name: "exercised0211.view.Detail",
            controller: this,
          });
          // 로드된 Dialog를 현재 뷰의 종속 객체로 추가합니다.
          this.getView().addDependent(this.oDialog);
        }
        // 다이얼로그에 detailModel이라는 이름으로 새로운 모델을 설정합니다.
        this.oDialog.setModel(oUpdateModel, "detailModel");
        // 다이얼로그를 엽니다.
        this.oDialog.open();
      },

      // onCloseDialog: 다이얼로그 닫기 함수
      onCloseDialog: function () {
        // Detail Dialog가 존재하면 닫음
        if (this.oDialog) {
          this.oDialog.close();
        }
        // Chart Dialog가 존재하면 닫음
        if (this.oChartDialog) {
          this.oChartDialog.close();
        }
      },

      // onFilterChange: 필터 입력(드롭다운, 입력 필드) 값 변경 시 호출되는 함수
      onFilterChange: function (oEvent) {
        // 드롭다운 컨트롤("genderSelect")에서 선택된 키(값)를 가져옵니다.
        var sSelectedGender = this.byId("genderSelect").getSelectedKey();
        // 입력 필드("classInput")에서 입력된 값을 가져옵니다.
        var sClassValue = this.byId("classInput").getValue();

        // 디버깅을 위해 선택된 값들을 콘솔에 출력합니다.
        console.log("Selected Gender:", sSelectedGender);
        console.log("Class Value:", sClassValue);

        // 필터 조건들을 저장할 배열 생성
        var aFilters = [];

        // 드롭다운에서 선택된 값이 "전체"가 아니라면 성별 필터를 추가합니다.
        if (sSelectedGender && sSelectedGender !== "전체") {
          aFilters.push(
            new sap.ui.model.Filter(
              "gender",
              sap.ui.model.FilterOperator.EQ,
              sSelectedGender
            )
          );
        }

        // 클래스 입력 값이 있다면, 클래스 필터를 추가합니다.
        if (sClassValue) {
          aFilters.push(
            new sap.ui.model.Filter(
              "class",
              sap.ui.model.FilterOperator.EQ,
              sClassValue
            )
          );
        }

        // 배열에 있는 필터 조건들을 AND 조건으로 결합하여 새로운 Filter 객체 생성
        var oCombinedFilter = new sap.ui.model.Filter(aFilters, true);
        // XML 뷰에 정의된 테이블("dataTable") 컨트롤을 가져옵니다.
        var oTable = this.byId("dataTable");
        // 테이블의 "rows" 바인딩(데이터 집합)을 가져옵니다.
        var oBinding = oTable.getBinding("rows");
        // 생성한 필터를 테이블 바인딩에 적용하여 데이터를 필터링합니다.
        oBinding.filter(oCombinedFilter);
      },
      onChart: async function (oEvent) {
        // Chart Dialog 전용 변수 사용
        if (!this.oChartDialog) {
          this.oChartDialog = await Fragment.load({
            id: this.getView().getId(),
            name: "exercised0211.view.Chart",
            controller: this,
          });
          // Chart Dialog를 현재 뷰의 종속 객체로 추가
          this.getView().addDependent(this.oChartDialog);
        }
        // 테이블("dataTable") 컨트롤의 "rows" 바인딩에서 필터링된 컨텍스트를 가져옵니다.
        var oTable = this.byId("dataTable");
        var aContexts = oTable.getBinding("rows").getContexts();

        // 각 컨텍스트에서 데이터를 추출하여 배열로 만듭니다.
        var aFilteredData = aContexts.map(function (oContext) {
          return oContext.getObject();
        });

        // 각 성별의 빈도를 집계합니다.
        var oGenderCounts = aFilteredData.reduce(function (acc, oItem) {
          if (acc[oItem.gender]) {
            acc[oItem.gender]++;
          } else {
            acc[oItem.gender] = 1;
          }
          return acc;
        }, {});

        // 집계 결과를 배열 형태로 변환합니다.
        var aChartData = [];
        for (var sGender in oGenderCounts) {
          aChartData.push({
            gender: sGender,
            count: oGenderCounts[sGender],
          });
        }

        // 새 JSONModel을 생성하여 차트 데이터를 설정합니다.
        var oChartModel = new JSONModel({ data: aChartData });
        // Chart Dialog에 "chartModel"이라는 이름으로 모델을 설정합니다.
        this.oChartDialog.setModel(oChartModel, "chartModel");

        // Chart Dialog를 엽니다.
        this.oChartDialog.open();
      },
    });
  }
);
