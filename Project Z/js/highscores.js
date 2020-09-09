var nickName = "";

getName.onclick = function () {
  var str = document.getElementById("inputName");
  nickName = str.value;
  console.log(nickName);
};

nicktext = nickName;

if (nicktext == "") nicktext = "Player";

var scoreTable = document.querySelector(".tableDiv");
var bodyHeight = document.body.offsetHeight;
var bodyWidth = document.body.offsetWidth;
var scoreTableHeight;
var scoreTableWidth;
var tableNone = false;

// ------------ таблица рекордов: узнаем размеры
scoreTable.style.display = "block";

scoreTableHeight = scoreTable.offsetHeight;
scoreTableWidth = scoreTable.offsetWidth;

scoreTable.style.top = -scoreTableHeight + "px";
scoreTable.style.left = bodyWidth / 2 - scoreTableWidth / 2 + "px";

// -------- позиционируем таблицу
function tableScore() {
  console.log("tableScore");
  scoreTable.style.display = "block";

  if (!tableNone) {
    read();
    scoreTable.style.top = "50%";
    scoreTable.style.left = "50%";
    scoreTable.style.transform =
      "translateZ(0) translateX(-50%) translateY(-50%)";

    tableNone = true;
  } else {
    scoreTable.style.top = "0";
    scoreTable.style.left = "50%";
    scoreTable.style.transform =
      "translateZ(0) translateX(-50%)  translateY(-100%) ";
    tableNone = false;
  }
}

