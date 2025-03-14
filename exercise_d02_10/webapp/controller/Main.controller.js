sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("exercised0210.controller.Main", {
        //컨트롤러가 로드 될 때 한 번만 실행 -> 모델 생성
        onInit() {
            // JSON 모델 생성 및 데이터 로드
            var oModel = new sap.ui.model.json.JSONModel();
            oModel.loadData("/student.json");
            this.getView().setModel(oModel, "studentModel");

            this.oRouter = this.getOwnerComponent().getRouter();
            // 라우트 "RouteMain"이 매칭될 때 onPatternMatched가 호출되도록 등록
            this.oRouter.getRoute("RouteMain").attachPatternMatched(this.onPatternMatched, this);
        },
        // onPatternMatched() {
        //     //패턴이 매칭되면 실행되는 함수를 만들어 초기화, 세팅, 매개변수 찾기 등을 할 수 있다.
        //     //이 함수는 라우팅이 일어날 때마다 실행된다.
        //     var oArgu = oEvent.getParameter("arguments"); //라우팅으로 전달된 매개변수 찾기, arguments는 라우팅 시 넘겨지는 값
        //     console.log("RouteMain 매칭, 전달된 매개변수:", oArgu);
        // }
        // ,
        onGoDetail() {
            var oTable = this.getView().byId("StudentTable");
var oSelectedItem = oTable.getSelectedItem();
if (!oSelectedItem) {
    sap.m.MessageToast.show("항목을 선택하세요.");
    return;
}
            var sPath = oSelectedItem.getBindingContext("studentModel").getPath(); //선택된 행의 경로 찾기
            var oData = this.getView().getModel("studentModel").getProperty(sPath); //선택된 행의 데이터 찾기
            this.oRouter.navTo("RouteDetail", { //manifest에 적은 route이름과 동일
                key1: oData.no, //선택된 행의 no 값
                key2: oData.name,
                key3: oData.gender,
                key4: oData.birthdate

            }
            , true);

            
            //input 필드에 들어오는 값 찾기 -> 매개변수로 전달하기
            // let sValue = this.getView().byId("idInput").getValue(); //뷰의 input id로 값 가져오기
            // this.oRouter.navTo("RouteDetail", { //manifest에 적은 route이름과 동일
            //     key1: sValue, //input 필드에 들어오는 값
            //     key2: 100
            // }, true);
        }
    });
});