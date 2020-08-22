var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var shooterImg = new Image();
shooterImg.src = "img/shooter.png";

var bulletImg = new Image();
bulletImg.src = "img/1.png";

var zombieImg = new Image();
zombieImg.src = "img/zombie-move.png";

var backgroungImg = new Image();
backgroungImg.src = "img/background.png";

var zombies = [];
var timer = 0;
var zombiesEscaped = [];
var shooter = { x: 420, y: 470 };
var bullet = [];
var score = 0;

canvas.addEventListener("mousemove", function (event) {
  shooter.x = event.offsetX;
  shooter.y = event.offsetY;
});

backgroungImg.onload = function () {
  game();
};

function game() {
  update();
  render();
  requestAnimationFrame(game);
}

function update() {
  //принцип спавна зомби
  timer++;
  if (timer % 50 == 0) {
    zombies.push({
      x: 330,
      y: -150,
      spdX: Math.random() * 2 + 1,
      spdY: Math.random() * 0.8 + 0.2,
      del: 0,
      animx: 0,
      animy: 0,
    });
  }

  //место вылета пули
  if (timer % 70 == 0) {
    bullet.push({
      x: shooter.x + 55,
      y: shooter.y - 35,
      dx: 5,
      dy: -5,
    });
  }

  //полет пули
  for (i in bullet) {
    bullet[i].y = bullet[i].y + bullet[i].dy;
    if (bullet[i].y < -10) {
      bullet.splice(i, 1);
    }
  }

  //физика зомби
  for (i in zombies) {
    zombies[i].y = zombies[i].y + zombies[i].spdY;
    zombies[i].x = zombies[i].x + zombies[i].spdX;

    // АНИМАЦИЯ ЗОМБИ НЕ РАБОТАЕТ
    zombies[i].animx = zombies[i].animx + 0.5;
    if (zombies[i].animx > 4) {
      zombies[i].animy++;
      zombies[i].animx = 0;
    }

    // границы движения зомби
    if (zombies[i].x >= 560 || zombies[i].x <= 330) {
      zombies[i].spdX = -zombies[i].spdX;
    }
    if (zombies[i].y >= 600) {
      zombiesEscaped += zombies.splice(i, 1);
      if (zombiesEscaped.length >= 30) {
        // return alert('game over');
      }
    }

    // столкновение пули и зомби
    for (j in bullet) {
      if (
        Math.abs(zombies[i].x + 20 - bullet[j].x - 10) < 80 &&
        Math.abs(zombies[i].y - bullet[j].y) < 50
      ) {
        // помечаем зомби на удаление
        zombies[i].del = 1;
        bullet.splice(j, 1);
        score++;
        break;
      }
    }
    // удаляем зомби
    if (zombies[i].del == 1) {
      zombies.splice(i, 1);
    }
  }
}

function render() {
  context.drawImage(backgroungImg, 0, 0, 1000, 565);
  
  for (i in zombies) {
    context.drawImage(
      zombieImg,
      231*Math.floor(zombies[i].animx),
      231*Math.floor(zombies[i].animy),
      231,
      231,
      zombies[i].x,
      zombies[i].y,
      80,
      80
    );
  }

  context.drawImage(shooterImg, shooter.x, shooter.y, 80, 80);
  
  for (i in bullet) {
    context.drawImage(bulletImg, bullet[i].x, bullet[i].y, 8, 40);
  }
  context.fillStyle = "#000";
  context.font = "20px Verdana";
  context.fillText("Счет: " + score, 40, 550);
}

var requestAnimationFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 20);
    }
  );
})();
