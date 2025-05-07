sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
], (Controller, ODataModel) => {
    "use strict";

    return Controller.extend("cl4.exprogramd02.controller.View1", {
        onInit() {
            var oModel = new ODataModel("/sap/opu/odata/sap/ZEXAM_MEMBER_D002_SRV/");
            this.getView().setModel(oModel);
            this.oRouter = this.getOwnerComponent().getRouter();
            // 라우트 "RouteMain"이 매칭될 때 onPatternMatched가 호출되도록 등록
        },

        async onOpenDialog() {
                this.oDialog ??= await this.loadFragment({
                name: "cl4.exprogramd02.view.CreateDialog", // 프래그먼트 경로 및 이름 지정
                Controller: this, // 현재 컨트롤러를 프래그먼트 컨트롤러로 지정
                });
            this.oDialog.open();
        },
        
        onCreate() { //create하기 위해 각 input에서 값을 가져옴옴
            var oModel = this.getView().getModel();
            var Name = this.getView().byId("input_name").getValue();

            //bdate 변환 과정
            var oDatePicker = this.getView().byId("input_bdate");
            var oDate = oDatePicker.getDateValue();
            var sEdmBdate = oDate.getTime();
            var Bdate = new Date(sEdmBdate);
            console.log(Bdate);

            var Gender = this.getView().byId("input_gender").getValue();
            var City = this.getView().byId("input_city").getValue();
            var Country = this.getView().byId("input_country").getValue();
            var Telephone = this.getView().byId("input_telephone").getValue();
            var Email = this.getView().byId("input_email").getValue();

            var oEntry = { //데이터 삽입 용 wa
                Name: Name,
                Bdate: Bdate,
                Gender: Gender,
                City: City,
                Country: Country,
                Telephone: Telephone,
                Email: Email,
            };
            console.log(oEntry);

            oModel.create("/MEMBERSet", oEntry, { //데이터 삽입 로직
                success: function () {
                    if (oEntry.Name == "") { 
                        sap.m.MessageToast.show("이름을 입력하세요");
                        return;
                    } else if (oEntry.Bdate == "") {
                        sap.m.MessageToast.show("생년월일을 입력하세요");
                        return;
                    } else if (oEntry.Gender == "") {
                        sap.m.MessageToast.show("성별을 입력하세요");
                        return;
                    } else if (oEntry.City == "") {
                        sap.m.MessageToast.show("도시를 입력하세요");
                        return;
                    } else if (oEntry.Country == "") {
                        sap.m.MessageToast.show("국가를 입력하세요");
                        return;
                    } else if (oEntry.Telephone == "") {
                        sap.m.MessageToast.show("전화번호를 입력하세요");
                        return;
                    } else if (oEntry.Email == "") {
                        sap.m.MessageToast.show("이메일을 입력하세요");
                        return;
                    }
                    //회원 정보 등록 성공 및 실패 메시지 출력력
                    sap.m.MessageToast.show("회원 정보가 저장되었습니다");
                    this.oDialog.close();
                    oModel.refresh();
                },
                error: function () {
                    sap.m.MessageToast.show("회원 정보 저장 실패");
                },
            });
        },

        onCloseDialog() { //dialog 꺼지는 함수
            this.oDialog.close();
        },
        onGoDetail() { //detail 페이지로 이동 함수
            var oTable = this.getView().byId("mTable");
            var oSelectedItem = oTable.getSelectedItem();

            var sPath = oSelectedItem.getBindingContext().getPath(); //선택된 행의 경로 찾기
            var oData = this.getView().getModel().getProperty(sPath); //선택된 행의 데이터 찾기
            this.getOwnerComponent().getRouter().navTo("RouteDetail", {
                "?query": { //물음표 쿼리로 데이터 전달
                    key1: oData.Id,
                    key2: oData.Name,
                    key3: oData.Bdate,
                    key4: oData.Gender,
                    key5: oData.City,
                    key6: oData.Country,
                    key7: oData.Telephone,
                    key8: oData.Email,
                }
            }, true);
        }
    });
});