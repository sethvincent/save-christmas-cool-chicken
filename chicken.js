var inherits = require('inherits');
var Entity = require('crtrdg-entity');
var randomInt = require('./util/math').randomInt;

module.exports = Chicken;

function Chicken(options){
  Entity.call(this);
  var self = this;
  this.game = options.game;

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
  this.camera = options.camera;

  this.left = this.position.x;
  this.top = self.position.y;

  this.on('update', function(interval){ 
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