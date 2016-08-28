var startButton, timer, audio, entity, frame, food_entity;
var keyboard = [];
var entitySpeed = 2;
var boundary = 400;
var speed = false;
var size = false;

function collideDetect(el1, el2) {

    el1.offsetBottom = el1.offsetTop + el1.offsetHeight;
    el1.offsetRight = el1.offsetLeft + el1.offsetWidth;
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
    el2.offsetRight = el2.offsetLeft + el2.offsetWidth;

    return !((el1.offsetBottom < el2.offsetTop) ||
             (el1.offsetTop > el2.offsetBottom) ||
             (el1.offsetRight < el2.offsetLeft) ||
             (el1.offsetLeft > el2.offsetRight))
	};

function grow() {
  entity.style.height = (entity.clientHeight + 5) + "px";
  entity.style.width = (entity.clientWidth + 5) + "px";
}

function super_grow() {
  entity.style.height = (entity.clientHeight + 15) + "px";
  entity.style.width = (entity.clientWidth + 15) + "px";
}

function gameOver() {
  frame.removeChild(entity);
  frame.removeChild(food_entity);
  timer.innerText = "Win";
  timer.style.display = "block";
}

function checkForCompletion() {
  if(entity.clientHeight == 300 && entity.clientWidth == 300) {
    gameOver();
  }
}


function initialize(e) {
  startButton = document.getElementById('startButton');
  timer = document.getElementById('timer');
  audio = document.getElementById('audio');
  frame = document.getElementById('frame');

  document.addEventListener('keydown', function(event) {
    keyboard[event.keyCode] = true;

    if(keyboard[37]) {
      entity.style.left = (entity.offsetLeft - entitySpeed) + "px";
    }
    if(keyboard[38]) {
      entity.style.top = (entity.offsetTop - entitySpeed) + "px";
    }
    if(keyboard[39]) {
      entity.style.left = (entity.offsetLeft + entitySpeed) + "px";
    }
    if(keyboard[40]) {
      entity.style.top = (entity.offsetTop + entitySpeed) + "px";
    }
    if(keyboard[32]) {
      entitySpeed = 5;
    } else {
      entitySpeed = 2;
    }


    if(collideDetect(food_entity, entity)) {
      if(speed) {
        audio.src = 'sounds/power_up.mp3';
        audio.load();
        entity.style.background = 'red';
        entitySpeed += 2;
        speed = false;
        audio.play();
      } else {
        entity.style.background = 'limegreen';
        entitySpeed -= 2;
      }

      if(size) {
        audio.src = 'sounds/power_up.mp3';
        audio.load();
        entity.style.background = 'yellow;'
        audio.play();
        super_grow();
        size = false;
      }
      frame.removeChild(food_entity);
      locateFood();
      grow();
      checkForCompletion();
    }
  });

  document.addEventListener('keyup', function(event) {
    keyboard[event.keyCode] = false;
  });

  startButton.addEventListener('click', function(e) {
    startButton.style.display = 'none';
    startTimer(e);
  }, false);
}

window.onload = initialize;

function startTimer(e) {
  setTimeout(function(){
    timer.innerText = '3';
    audio.play();
    setTimeout(function(){
      audio.currentTime = 0;
      timer.innerText = '2';
      audio.play();
      setTimeout(function(){
        audio.currentTime = 0;
        timer.innerText = '1';
        audio.play();
        setTimeout(function(){
          audio.currentTime = 0;
          timer.innerText = 'Start';
          audio.play();
          setTimeout(function(){
            timer.style.display = 'none';
            startGame();
          },750);
        },1000);
      },1000);
    },1000);
  },1000);

}

function locateFood() {
  var offset_top = Math.floor(Math.random() * boundary);
  var offset_left = Math.floor(Math.random() * boundary);
  var rare_food = Math.floor(Math.random() * 200);
  food_entity = document.createElement('div');
  if(rare_food == 50) {
    food_entity.style.background = "red";
    speed = true;
  }

  if(rare_food == 150) {
    food_entity.style.background = 'yellow';
    size = true;
  }
  food_entity.className = 'food';
  food_entity.style.left = offset_left + "px";
  food_entity.style.top = offset_top + "px";
  frame.appendChild(food_entity);
}

function loadEntity() {
  entity = document.createElement('div');
  entity.className = 'entity';
  frame.appendChild(entity);

}

function startGame() {
  loadEntity();
  locateFood();
}
