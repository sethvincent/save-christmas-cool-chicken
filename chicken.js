var inherits = require('inherits');
var Entity = require('crtrdg-entity');
var randomInt = require('./util/math').randomInt;

module.exports = Chicken;

function Chicken(options){
  Entity.call(this);
  var self = this;
  this.game = options.game;
  this.map = options.map;
  this.camera = options.camera;

  this.size = {
    x: 20,
    y: 20
  };

  this.position = {
    x: options.position.x,
    y: options.position.y,
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
  this.left = this.position.x;
  this.top = this.position.y;

  console.log(this.camera.position.x, this.position.x, this.camera.map.width)

  this.on('update', function(interval){ 
    this.move();
    self.velocity.x = parseInt(self.velocity.x * this.friction);
    self.velocity.y = parseInt(self.velocity.y * this.friction);
    self.boundaries();
  });

  this.on('draw', function(context){
    if (self.visible){
      context.save();  

      context.fillStyle = '#fff';
      context.fillRect(self.left, self.top, 30, 30);

      context.fillStyle = 'orange';
      context.fillRect(self.left+30, self.top+5, 5, 5);

      context.fillRect(self.left+35, self.top+10, 5, 5);

      context.fillRect(self.left+35, self.top, 5, 5);

      context.fillRect(self.left+5, self.top+30, 5, 15);
      context.fillRect(self.left+15, self.top+30, 5, 15);

      context.restore();
    }
  });
}

inherits(Chicken, Entity);

Chicken.prototype.move = function(){
  this.velocity.x += this.speed;
  this.velocity.y += this.speed;
  
  this.position.x += this.velocity.x * this.friction;
  this.position.y += this.velocity.y * this.friction;

  this.left = this.position.x - this.camera.position.x;
  this.top = this.position.y;
};

Chicken.prototype.boundaries = function(){
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