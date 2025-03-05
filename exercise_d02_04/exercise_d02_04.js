//버튼 클릭 시 호출되는 함수

function calculate() {
  document.getElementById("result").innerHTML = performCalculation(
    //입력된 값을 가져와서 계산
    parseInt(document.getElementById("length").value),
    parseInt(document.getElementById("width").value)
  );
}

//계산 함수
function performCalculation(length, width) {
  return length * width;
}
