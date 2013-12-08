var randomInt = require('./util/math').randomInt;
var randomGray = require('./util/math').randomGray;
var randomGrayAlpha = require('./util/math').randomGrayAlpha;
var randomRGBA = require('./util/math').randomRGBA;

module.exports = Map;

function Map(game, width, height){
  console.log(width, height)
  this.game = game;
  this.width = width;
  this.height = height;
  this.image = null;
  this.image = null;
}

Map.prototype.generate = function(ticks){
  var context = document.createElement('canvas').getContext('2d');
  
  context.canvas.width = this.width;
  context.canvas.height = this.height;

  var blockSize = 5;
  var rand = randomInt(0, 255);
  var columns = parseInt(this.width / blockSize) + 1;
  var rows = parseInt(this.height / blockSize) + 1;

  for (var x = 0, i = 0; i < columns; x+=blockSize, i++){
    for (var y = 0, j=0; j < rows; y+=blockSize, j++){      
      context.fillStyle = randomRGBA(0, rand*j-10, 20*j, 110+y, 20, 100*j+10, .5);
      context.fillRect(x, y, blockSize, blockSize);
    }
  }

  this.image = new Image();
  this.image.src = context.canvas.toDataURL("image/png");         

  context = null;
}

// draw the map adjusted to camera
Map.prototype.draw = function(context, camera){
  context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -camera.position.x, -camera.position.y, this.image.width, this.image.height);
}