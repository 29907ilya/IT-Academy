function startGame() {
    clickSound(mainSound);
    $("#start").hide();
    $("#game").show();
    game();
  }

  $(window).on('beforeunload', function(){ 
    return; 
  });
  
  function gameOver() {
    console.log("gameOver");
    $("#game-over").show();
  }
  
  function mainMenu() {
    $("#game").hide();
    $("#start").show();
    lockGet(randPass);
  }
  
  document.getElementById("play-again").addEventListener("click", toMainMenu)
  function toMainMenu() {
    console.log("game-over none");
    $("#game-over").hide();
    zombies = [];
    timer = 0;
    mainMenu();
    cancelAnimationFrame(myReq);
    reset();
  };
  
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

  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  var myReq;
  
  function reset() {
    document.getElementById("game-over").style.display = "none";
    newscore = 0;
    zombies = [];
    bullets = [];
    shooter = { x: 420, y: 410, speed: 200, animx: 0, animy: 0 };
  }
