let toDoList = [];

while (true) {
  let choice = prompt("1. 할 일 추가\n2. 할 일 제거\n3. 종료");

  if (choice === "1") {
    let newTask = prompt("추가할 할 일을 입력하세요");
    toDoList.push(newTask);
    console.log("현재 할 일 목록:", toDoList);
  } else if (choice === "2") {
    let removeIndex = prompt("제거할 할 일의 번호를 입력하세요");
    parseInt(removeIndex);
    if (removeIndex > -1) {
      toDoList.splice(removeIndex, 1);
    } else {
      console.log("0이상의 수를 입력해주세요.");
    }
  } else if (choice === "3") {
    console.log("최종 할 일 목록:", toDoList);
    break;
  } else {
    console.log("1, 2, 3 중 하나를 입력해주세요.");
  }
}
