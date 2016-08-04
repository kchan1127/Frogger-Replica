// Enemies our player must avoid
"use strict";
var Enemy = function (x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.howFast = Math.random() * 200;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.howFast * dt);
    if(this.x > 500){
      this.x = Math.random() * -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
  this.x = 202;
  this.y = 405;
  this.score = 0;
  this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(){
  this.x = this.x;
  this.y = this.y;
  this.collision();
  if(this.y < 10){
    this.posReset();
    this.score += 5;
  }
}

Player.prototype.collision = function(){
  var length = allEnemies.length;
  for(var a = 0; a < length; a++ ){
    if(Math.abs(this.x - allEnemies[a].x) < 30 && Math.abs(this.y - allEnemies[a].y) < 30){
        this.posReset();
    }
  }
}

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.fillStyle = "purple";
  ctx.font = "30px Arial";
  ctx.fillText("Your Score is: " + this.score, 10, 580);
}

Player.prototype.posReset = function(){
  this.x = 202;
  this.y = 405;
}


Player.prototype.handleInput = function(allowedKeys){
  if(allowedKeys === 'left' && this.x > 0){
    this.x -= 100;
  }
  else if(allowedKeys === 'right' && this.x < 400){
    this.x += 100;
  }
  else if(allowedKeys === 'up' && this.y > 0){
    this.y -= 80;
  }
  else if (allowedKeys === 'down' && this.y < 400) {
    this.y += 80;
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(-200, 50);
var enemy2 = new Enemy(-300, 150);
var enemy3 = new Enemy(-100, 230);
var enemy4 = new Enemy(-330, 50);
var enemy5 = new Enemy(-120, 30);
var enemy6 = new Enemy(-440, 150);
var enemy7 = new Enemy(-460, 250);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7];
var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
