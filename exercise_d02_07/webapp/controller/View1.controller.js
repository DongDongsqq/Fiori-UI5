sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/ui/model/odata/v2/ODataModel","sap/ui/model/json/JSONModel"], // ODataModel 모듈 추가하기
    (Controller, ODataModel, JSONModel) => {
      "use strict";
  
      return Controller.extend("exercised0207.controller.View1", {
        onInit() {
      // odata 모델 생성 및 설정
      var oModel = new ODataModel("/sap/opu/odata/sap/ZCAR_D02_SRV/"); // 이 경로는 manifest.json에서 찾을 수 있음 - dataSources

      //view에 모델 생성
      this.getView().setModel(oModel);
        },
        onCreate() {
          var oModel = this.getView().getModel();
          var carrid = this.getView().byId("input_carrid").getValue();
          var carrname = this.getView().byId("input_carrname").getValue();
          var currcode = this.getView().byId("input_currcode").getValue();
          var url = this.getView().byId("input_url").getValue();

          var oEntry = {
            Carrid: carrid,
            Carrname: carrname,
            Currcode: currcode,
            Url: url,
          };

          oModel.create("/ZCARR_D02Set", oEntry, {
            success: function(){
              sap.m.MessageToast.show("항공사 데이터 생성 성공");
              oModel.refresh();
            },
            error: function(){
              sap.m.MessageToast.show("데이터 생성 오류");
            },
          });
        },

// ------OnDelete--------------------------------------------------------------------
        onDelete() {
          var oTable = this.getView().byId("mTable");
          var oSelectedItem = oTable.getSelectedItem();
  
          if (!oSelectedItem) {
            sap.m.MessageToast.show("삭제할 항목을 선택해주세요.");
            return;
          }
  
          var sPath = oSelectedItem.getBindingContext().getPath();
          var oModel = this.getView().getModel();
  
          oModel.remove(sPath, {
            success: function() {
              sap.m.MessageToast.show("항공사 데이터 삭제 성공");
              oTable.removeSelections();
              oModel.refresh();
            },
            error: function() {
              sap.m.MessageToast.show("데이터 삭제 오류");
            },
          });
        },
// ------OnOpenDialog--------------------------------------------------------------------
        async onOpenDialog() {
          var oTable = this.getView().byId("mTable");
          var oSelectedItem = oTable.getSelectedItem();
          
          if (!oSelectedItem) {
            sap.m.MessageToast.show("변경할 항목을 선택해주세요.");
            return;
          }
          
          var oBindingContext = oSelectedItem.getBindingContext();
          var oData = oBindingContext.getObject();

          const oUpdateModel = new JSONModel({
            Carrid: oData.Carrid,
            Carrname: oData.Carrname,
            Currcode: oData.Currcode,
            Url: oData.Url,
            Name: oData.Name,
            Date: oData.Date,
            Time: oData.Time,
          });
        // 프래그먼트 경로와 이름을 정확히 맞추기
        if (!this.oDialog) {
          this.oDialog = await this.loadFragment({
            name: "exercised0207.view.UpdateDialog", Controller: this,
          });
        }
        this.oDialog.setModel(oUpdateModel, "updateview");
        this.oDialog.open();
      },
        onCloseDialog() {
          this.oDialog.close();
          sap.m.MessageToast.show("데이터 수정 취소");
      },
    // ------OnUpdate--------------------------------------------------------------------
      onUpdate() {
        var oTable = this.getView().byId("mTable");
        var oSelectedItem = oTable.getSelectedItem();
        var sPath = oSelectedItem.getBindingContext().getPath();
        // 백엔드 업데이트를 위해 ODataModel을 가져옴
        var oODataModel = this.getView().getModel();

        // 업데이트할 데이터는 대화상자에 바인딩된 JSONModel("updateview")에서 가져옴
        var oUpdateModel = this.oDialog.getModel("updateview");

        var oEntry = {
          // 예시로 항공사 이름과 URL을 업데이트한다고 가정
          Carrname: oUpdateModel.getProperty("/Carrname"),
              Url: oUpdateModel.getProperty("/Url")
        };

         // ODataModel의 update 메서드를 호출하여 백엔드 데이터를 수정
  oODataModel.update(sPath, oEntry, {
    success: function() {
      sap.m.MessageToast.show("항공사 데이터 수정 성공");
      oODataModel.refresh(); // 변경사항 반영을 위해 모델 새로고침
    },
    error: function() {
      sap.m.MessageToast.show("데이터 수정 오류");
    }
  });

  // 대화상자 닫기
  this.oDialog.close();

        }
      });
    }
  );