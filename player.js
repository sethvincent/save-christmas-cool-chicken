var inherits = require('inherits');
var Entity = require('crtrdg-entity');
var randomInt = require('./util/math').randomInt;

module.exports = Player;

function Player(options){
  Entity.call(this);
  var self = this;

  this.game = options.game;

  this.size = {
    x: 20,
    y: 20
  };

  this.position = {
    x: 100,
    y: 300,
  };

  this.velocity = {
    x: 0,
    y: 0
  };

  this.speed = 5;
  this.friction = 0.8;
  this.health = 100;
  this.strength = 5;
  this.color = '#f4f4ed';
  this.direction = 'right';
  this.visible = true;
  
  this.particles = {
    jump: {
      size: 3,
      number: 10,
      color: '#b4b4ad'
    }
  }
  
  this.camera = options.camera;
  this.keysDown = options.keyboard.keysDown;
  var keyboard = options.keyboard;

  this.on('update', function(interval){ 
    self.input(self.keysDown);
    self.move();
    self.velocity.x = parseInt(self.velocity.x * this.friction);
    self.velocity.y = parseInt(self.velocity.y * this.friction);
    self.boundaries();
  });

  this.on('draw', function(context){
    if (self.visible){
      context.save();  

      context.fillStyle = '#fff';
      context.fillRect(
        self.position.x - self.camera.position.x, 
        self.position.y - self.camera.position.y, 
        self.size.x, 
        self.size.y
      );

      context.restore();
    }
  });
}

inherits(Player, Entity);

Player.prototype.move = function(){
  this.position.x += this.velocity.x * this.friction;
  this.position.y += this.velocity.y * this.friction;
};

Player.prototype.boundaries = function(){
  if (this.position.x <= 0){
    this.position.x = 0;
  }

  if (this.position.x >= this.camera.map.width - this.size.x){
    this.position.x = this.camera.map.width - this.size.x;
  }

  if (this.position.y <= 0){
    this.position.y = 0;
  }

  if (this.position.y >= this.camera.map.height - this.size.y){
    this.position.y = this.camera.map.height - this.size.y;
  }
};

Player.prototype.input = function(keysdown){
  if ('A' in keysdown){
    this.direction = 'left';
    this.velocity.x -= this.speed;
  }

  if ('D' in keysdown){
    this.direction = 'right';
    this.velocity.x += this.speed;
  }

  if ('W' in keysdown){
    this.direction = 'up';
    this.velocity.y -= this.speed;
  }

  if ('S' in keysdown){
    this.direction = 'down';
    this.velocity.y += this.speed;
  }
};