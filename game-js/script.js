var myGamePiece;
var myObstacles = [];
var mySound;

var myGamePiece;
var myObstacles = [];
var myScore;

function startGame() {
  myGamePiece = new component(30, 30, 'red', 10, 120);
  myScore = new component('30px', 'Consolas', 'black', 280, 40, 'text');
  mySound = new sound('https://www.w3schools.com/graphics/bounce.mp3');
  myGameArea.start();
}

var myGameArea = {
  canvas: document.createElement('canvas'),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },
};

function component(width, height, color, x, y, type) {
  this.type = type;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = myGameArea.context;
    if (this.type == 'text') {
      ctx.font = this.width + ' ' + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
  };
  this.crashWith = function (otherobj) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  };
}

function updateGameArea() {
  var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      mySound.play();
      myGameArea.stop();
      return;
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new component(10, height, 'green', x, 0));
    myObstacles.push(
      new component(10, x - height - gap, 'green', x, height + gap)
    );
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].speedX = -1;
    myObstacles[i].newPos();
    myObstacles[i].update();
  }
  myScore.text = 'SCORE: ' + myGameArea.frameNo;
  myScore.update();
  myGamePiece.newPos();
  myGamePiece.update();
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}
document.addEventListener('keydown', function (e) {
  switch (e.keyCode) {
    case 37: // Tecla de seta para a esquerda
      moveleft();
      break;
    case 39: // Tecla de seta para a direita
      moveright();
      break;
    case 38: // Tecla de seta para cima
      moveup();
      break;
    case 40: // Tecla de seta para baixo
      movedown();
      break;
  }
});

document.addEventListener('keyup', function (e) {
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    // Qualquer tecla de seta foi solta
    clearmove();
  }
});

// Função para mover o bloco para cima
function moveup() {
  myGamePiece.speedY = -5;
}







function moveup() {
  myGamePiece.speedY = -3;
}

function movedown() {
  myGamePiece.speedY = 3;
}

function moveleft() {
  myGamePiece.speedX = -3;
}

function moveright() {
  myGamePiece.speedX = 3;
}

function clearmove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}
function sound(src) {
  this.sound = document.createElement('audio');
  this.sound.src = src;
  this.sound.setAttribute('preload', 'auto');
  this.sound.setAttribute('controls', 'none');
  this.sound.style.display = 'none';
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
startGame();