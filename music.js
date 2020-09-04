var mainSound = new Audio("audio/bg-music.mp3")
var shotSound = new Audio("audio/shot.mp3")
shotSound.volume=0.6;
var killSound = new Audio("audio/killed.mp3")
var zombieSound = new Audio("audio/zombieSound.mp3")
zombieSound.volume=0.5;
var deadSound = new Audio("audio/dead.mp3")

function clickSound(clickAudio) {
    clickAudio.currentTime = 0; // в секундах
    clickAudio.play();
  }

  function soundClick() {
    mainSound.play();
    mainSound.pause();

    shotSound.play(); 
    shotSound.pause();
      
    killSound.play();   
    killSound.pause();    

    zombieSound.play();    
    zombieSound.pause();
    
    deadSound.play();    
    deadSound.pause();
}


// function unmuteSound() {
//   mainSound.play();
//   shotSound.play();
//   killSound.play(); 
//   zombieSound.play();
//   deadSound.play();
// }


// function muteSound() {
//   mainSound.pause();
//   shotSound.pause();
//   killSound.pause(); 
//   zombieSound.pause();
//   deadSound.pause();
// }

// document.getElementById("#mute").onclick = function() {
//   mainSound.pause();
//   shotSound.pause();
//   killSound.pause(); 
//   zombieSound.pause();
//   deadSound.pause();
// }
