window.onhashchange = SwitchToStateFromURLHash;

var SPAStateH = {};

function SwitchToStateFromURLHash() {
  var URLHash = window.location.hash;

  var StateStr = URLHash.substr(1);

  if (StateStr != "") {
    var PartsA = StateStr.split("_");
    SPAStateH = { pagename: PartsA[0] };
  } else SPAStateH = { pagename: "goToMainMenu" };

  console.log("Новое состояние приложения:");
  console.log(SPAStateH);

  var pageHTML = "";
  switch (SPAStateH.pagename) {
    case "goToMainMenu":
      goToMainMenuFunc();
      pageHTML +=
        '<div class="start_screen">\
                      <h1>ZOMBIE APOCALYPSE</h1>\
                      <div class="buttons">\
                        <form action="">\
                          <input id="inputName" type="longtext" placeholder="What is your name, soldier?">\
                          <input id="getName" type="button" value="Remember me!" placeholder=""> <br>\
                          <input id="start_button" onclick="startGame()" type="button" value="Start Game">\
                          <input class="start score" type="button" value="Highscores" onclick="tableScore()">\
                        </form>\
                      </div>\
                    </div>';
      break;
      case "tableScore":
        tableScoreFunc();
      pageHTML +=
        '<div class="tableDiv">\
                      <div class=" tableWrapper">\
                      <div onclick="tableScore()" class="start score"><button>Close</button></div>\
                    </div>\
                    </div>';
      break;
    case "startGame":
      startGamePlay();
      pageHTML += '<canvas id="game" width="980" height="500"></canvas>';
      break;
  }
  
  document.getElementById("IPage").innerHTML = pageHTML;
}
// if (SPAStateH.pagename === "startGame") {
//     startGamePlay();
// }
// if (SPAStateH.pagename === "tableScore") {
//     startGamePlay();
// }
// if (SPAStateH.pagename === "goToMainMenu") {
//     goToMainMenu();
//   }

function SwitchToState(NewStateH) {
  var StateStr = NewStateH.pagename;
  location.hash = StateStr;
}

function goToMainMenu() {
  SwitchToState({ pagename: "goToMainMenu" });
}

function goToRecords() {
  SwitchToState({ pagename: "tableScore" });
}

function startGamePlay() {
  SwitchToState({ pagename: "startGame" });
}
SwitchToStateFromURLHash();









