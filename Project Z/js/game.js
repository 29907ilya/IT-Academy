function startGame() {
  $("#start").hide();
  game();
  clickSound(mainSound);
  randPass = randomDiap(1, 5000);
}

$(window).on('beforeunload', function(){ 
	return 'Вы действительно хотите уйти?'; 
});

function gameOver() {
  document.getElementById("game-over").style.display = "block"
}

function mainMenu() {
  $("#game").hide();
  location.reload()
}

document.getElementById("play-again").addEventListener("click", function () {
  mainMenu();

  // reset();
});

var requestAnimationFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}













// function reset() {
//   $("#game").show();
//   document.getElementById("game-over").style.display = "none";
//   newscore = 0;
//   zombies = [];
//   bullets = [];
//   shooter = { x: 420, y: 410, speed: 200, animx: 0, animy: 0 };
// }
