var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var shooterImg = new Image();
shooterImg.src = "img/shooter-move.png";

var bulletImg = new Image();
bulletImg.src = "img/bullet.png";

var explImg = new Image();
explImg.src = "img/explosion.png";

var zombieImg = new Image();
zombieImg.src = "img/zombie-move.png";

var backgroungImg = new Image();
backgroungImg.src = "img/background.png";

var zombies = [];
var timer = 0;
var shooter = { x: 420, y: 410, speed: 200, animx: 0, animy: 0 };
var modifier = 0.02;
var bullet = [];
var newscore = 0;
var nicktext = "";
var arrScore = [];
var expl = [];
var explSpeed = 0;
var randPass = 0;
var scoreData;

var keysDown = {};
// ------ движение стрелка
window.addEventListener(
  "keydown",
  function (key) {
    keysDown[key.keyCode] = true;
  },
  false
);
window.addEventListener(
  "keyup",
  function (key) {
    delete keysDown[key.keyCode];
  },
  false
);

function shooterMove() {
  if (87 in keysDown) {
    shooter.y -= shooter.speed * modifier;
  }
  if (83 in keysDown) {
    shooter.y += shooter.speed * modifier;
  }
  if (65 in keysDown) {
    shooter.x -= shooter.speed * modifier;
  }
  if (68 in keysDown) {
    shooter.x += shooter.speed * modifier;
  }
}

// ---------- стрельба и точка вылета пули
canvas.addEventListener("click", fire, false);
function fire(f) {
  if ((f.fire = true)) {
    if (timer % 2 == 1) {
      clickSound(shotSound);
      bullet.push({
        x: shooter.x + 55,
        y: shooter.y - 35,
        dx: 5,
        dy: -5,
      });
    }
  }
}

// случайное число
function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}
randPass = randomDiap(1, 5000);

function game() {
  upgrade();
  render();
  requestAnimationFrame(game);
}

function upgrade() {
  shooterMove(shooter);

  //------------- З О М Б И ------------------
  //принцип появления зомби

  timer++;
  if (timer % 100 == 0) {
    clickSound(zombieSound);
    zombies.push({
      x: 400,
      y: -220,
      spdX: Math.random() * 1 + 1,
      spdY: Math.random() * 1.7 + 0.2,
      del: 0,
      animx: 0,
      animy: 0,
    });
  }

  // ----------  АНИМАЦИЯ ЗОМБИ

  for (i = 0; i < zombies.length; i++) {
    zombies[i].animx = zombies[i].animx + 0.3;

    if (zombies[i].animx >= 4) {
      zombies[i].animy++;
      zombies[i].animx = 0;
    }
    if (zombies[i].animy >= 4) {
      zombies[i].animy = 0;
      zombies[i].animx = 0;
    }
  }

  //движение зомби
  for (i = 0; i < zombies.length; i++) {
    zombies[i].y = zombies[i].y + zombies[i].spdY;
    zombies[i].x = zombies[i].x + zombies[i].spdX;

    // границы движения зомби
    if (zombies[i].x >= 560 || zombies[i].x <= 330) {
      zombies[i].spdX = -zombies[i].spdX;
    }
    if (zombies[i].y >= 550) {
      zombies = [];
      bullets = [];
      gameOver();
    }

    // столкновение пули и зомби
    for (j = 0; j < bullet.length; j++) {
      if (
        Math.abs(zombies[i].x + 20 - bullet[j].x - 10) < 20 &&
        Math.abs(zombies[i].y - bullet[j].y) < 20
      ) {
        clickSound(killSound);

        //----- взрыв при столкновении пули и зомби
        expl.push({
          x: zombies[i].x,
          y: zombies[i].y,
          animx: explSpeed,
          animy: explSpeed,
        });
        //--------------------------------------------------------

        // помечаем зомби на удаление
        zombies[i].del = 1;
        newscore++;
        break;
      }
      // удаляем зомби
      
    }  
    if (zombies[i].del == 1) {
        bullet.splice(j, 1);
        zombies.splice(i, 1);
      }
  }

  //---------------- С Т Р Е Л О К -----------

  // границы движения стрелка
  if (shooter.x > 560) {
    shooter.x = 560;
  } else if (shooter.x < 290) {
    shooter.x = 290;
  } else if (shooter.y < 350) {
    shooter.y = 350;
  } else if (shooter.y > 450) {
    shooter.y = 450;
  }

  // ----------- анимация движения стрелка
  for (i in shooter) {
    shooter.animx = shooter.animx + 0.05;

    if (shooter.animx >= 5) {
      shooter.animy++;
      shooter.animx = 0;
    }
    if (shooter.animy >= 4) {
      shooter.animy = 0;
      shooter.animx = 0;
    }
  }

  //---------------- П У Л И -----------------

  //полет пули
  for (i = 0; i < bullet.length; i++) {
    bullet[i].y = bullet[i].y + bullet[i].dy;

    if (bullet[i].y < -10) {
      bullet.splice(i, 1);
    }
  }

  // ---------------- В З Р Ы В -------------
  // анимация взрыва
  for (i = 0; i < expl.length; i++) {
    expl[i].animx = expl[i].animx + 0.5;

    if (expl[i].animx > 4) {
      expl[i].animy++;
      expl[i].animx = 0;
    }
    if (expl[i].animy > 4) {
      expl.splice(i, 1);
    }
  }
}

function render() {
  context.drawImage(backgroungImg, 0, 0, 1000, 565);

  for (i in shooter) {
    context.drawImage(
      shooterImg,
      206 * Math.floor(shooter.animx),
      313 * Math.floor(shooter.animy),
      206,
      313,
      shooter.x,
      shooter.y,
      80,
      80
    );
  }

  for (i = 0; i < bullet.length; i++) {
    context.drawImage(bulletImg, bullet[i].x, bullet[i].y, 8, 40);
  }

  for (i = 0; i < zombies.length; i++) {
    context.drawImage(
      zombieImg,
      231 * Math.floor(zombies[i].animx),
      231 * Math.floor(zombies[i].animy),
      231,
      231,
      zombies[i].x,
      zombies[i].y,
      80,
      80
    );
  }

  for (i = 0; i < expl.length; i++) {
    context.drawImage(
      explImg,
      128 * Math.floor(expl[i].animx),
      128 * Math.floor(expl[i].animy),
      128,
      128,
      expl[i].x,
      expl[i].y,
      80,
      80
    );
  }

  context.fillStyle = "black";
  context.font = "900 25px 'Griffy', cursive";
  context.fillText("Score: " + newscore, 40, 490);
}
