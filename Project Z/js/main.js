var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var shooterImg = new Image();
shooterImg.src = "img/shooter-move.png";

var bulletImg = new Image();
bulletImg.src = "img/bullet.png";

var explImg = new Image();
explImg = "img/explosion.png";

var zombieImg = new Image();
zombieImg.src = "img/zombie-move.png";

var bloodImg = new Image();
bloodImg.src = "img/blood.png"

var backgroungImg = new Image();
backgroungImg.src = "img/background.png";

var zombies = [];
var timer = 0;
var shooter = { x: 420, y: 410, animx: 0, animy: 0 };
var bullet = [];
var score = 0;
var expl = [];
var blood = [];

window.addEventListener("keydown", keyDown, false);

function keyDown(e) {
  if (e.keyCode === 65) {
    shooter.x -= 3;
  }
  if (e.keyCode === 68) {
    shooter.x += 3;
  }
  if (e.keyCode === 87) {
    shooter.y -= 3;
  }
  if (e.keyCode === 83) {
    shooter.y += 3;
  }
}

canvas.addEventListener("click", fire, false);
function fire(f) {
  if ((f.fire = true)) {
    if (timer % 2 == 0) {
      bullet.push({
        x: shooter.x + 55,
        y: shooter.y - 35,
        dx: 5,
        dy: -5,
      });
    }
  }
}

backgroungImg.onload = function () {
  game();
};



function game() {
  update();
  render();
  requestAnimationFrame(game);
}




function update() {
  //------------- З О М Б И ------------------
  //принцип появления зомби
  timer++;
  if (timer % 50 == 0) {
    zombies.push({
      x: 400,
      y: -50,
      spdX: Math.random() * 2 + 1,
      spdY: Math.random() * 1 + 0.2,
      del: 0,
      animx: 0,
      animy: 0,
    });
  }

  // for (i in blood) {
  //   blood[i].animx = blood[i].animx + 0.2;

  //   if (blood[i].animx >= 4) {
  //     blood[i].animy++;
  //     blood[i].animx = 0;
  //   }
  //   if (blood[i].animy >= 4) {
      
  //   }
  // }

  // ----------  АНИМАЦИЯ ЗОМБИ 

  for (i in zombies) {
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
  for (i in zombies) {
    zombies[i].y = zombies[i].y + zombies[i].spdY;
    zombies[i].x = zombies[i].x + zombies[i].spdX;

    // границы движения зомби
    if (zombies[i].x >= 560 || zombies[i].x <= 330) {
      zombies[i].spdX = -zombies[i].spdX;
    }
    if (zombies[i].y >= 550) {
      gameOver();
    }

        
    // столкновение пули и зомби
    for (j in bullet) {
      if (
        Math.abs(zombies[i].x + 20 - bullet[j].x - 10) < 20 &&
        Math.abs(zombies[i].y - bullet[j].y) < 20
      ) {










      //----- взрыв при столкновении пули и зомби не срабатывает      

      // expl.push({
      //   x: zombies[i].x - 20,
      //   y: zombies[i].y - 20,
      //   animx: 0,
      //   animy: 0
      // });


      //--------------------------------------------------------










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

    
    // столкновение стрелка и зомби
    for (i in zombies) {
      if (shooter.x < zombies[i].x + 20 &&
          shooter.x + 20 > zombies[i].x &&
          shooter.y < zombies[i].y + 20 &&
          shooter.y + 20 > zombies[i].y )
      {
        blood.push({
          x: shooter.x + 40,
          y: shooter.y - 20,
          animx: 0,
          animy: 0
        });
        gameOver();
      }
    }
  }

  //---------------- С Т Р Е Л О К -----------

  // границы движения стрелка
  if (shooter.x > 560) {
    shooter.x = 560;
  } else if (shooter.x < 290) {
    shooter.x = 290;
  }
  else if (shooter.y < 350) {
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
  for (i in bullet) {
    bullet[i].y = bullet[i].y + bullet[i].dy;
    if (bullet[i].y < -10) {
      bullet.splice(i, 1);
    }
  }

  // ---------------- В З Р Ы В -------------
  // анимация взрыва
  for (i in expl) {
    expl[i].animx = expl[i].animx + 0.5;
  
    if (expl[i].animx > 8) {
      expl[i].animy++;
      expl[i].animx = 0;
    }
    if (expl[i].animy > 6) {
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

  for (i in bullet) {
    context.drawImage(bulletImg, bullet[i].x, bullet[i].y, 8, 40);
  }

  for (i in zombies) {
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

  for (i in expl) {
    context.drawImage(
      explImg,
      96*Math.floor(expl[i].animx),
      94*Math.floor(expl[i].animy),
      96,
      94,
      expl[i].x,
      expl[i].y,
      80,
      80
    );
  }

  for (i in blood) {
    context.drawImage(
      bloodImg,
      128 * Math.floor(blood.animx),
      128 * Math.floor(blood.animy),
      128,
      128,
      blood.x,
      blood.y,
      80,
      80
    );
  }

  context.fillStyle = "black";
  context.font = "900 20px sans-serif";
  context.fillText("Score: " + score, 40, 490);
}

function gameOver() {
  document.getElementById("game-over").style.display = "block";
  
}


function reset() {
  document.getElementById('game-over').style.display = 'none';
  score = 0;
  zombies = [];
  bullets = [];
  shooter = { x: 420, y: 410, animx: 0, animy: 0 }
};

document.getElementById('play-again').addEventListener('click', function() {
  reset();
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
