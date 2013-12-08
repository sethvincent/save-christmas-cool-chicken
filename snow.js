var Entity = require('crtrdg-entity');
var inherits = require('inherits');
var randomInt = require('./util/math').randomInt;


module.exports = Snow;

function Snow(options){
  this.camera = options.camera;
  this.color = '#fff';

  this.size = {
    x: 5,
    y: 5
  }

  this.position = {
    x: options.x,
    y: -10
  }

  console.log('snow created')

  this.on('update', function(){
    //this.position.x -= this.camera.position.x;
    this.position.y += 1;
    console.log(this.position)
  })

  this.on('draw', function(c){
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
  });
}

inherits(Snow, Entity);