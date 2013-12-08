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

  var blockSize = 4;
  var rand = randomInt(0, 255);
  var columns = parseInt(this.width / blockSize) + 1;
  var rows = parseInt(this.height / blockSize) + 1;

  for (var x = 0, i = 0; i < columns; x+=blockSize, i++){
    for (var y = 0, j=0; j < rows; y+=blockSize, j++){

      context.fillStyle = randomRGBA(200, 250, 20*j/100, 25*j/10, 20*i/100, 30*i/100, .9);
      context.fillRect(x, y, blockSize, blockSize);
    }
  }

  // SAVE CHRISTMAS
  context.fillStyle = 'rgba(255, 255, 255, 0.5)';
  context.font = "bold 100px sans-serif";
  context.fillText("SAVE XMAS", 200, this.game.height/2 - 100);
  context.font = "bold 550px sans-serif";
  context.fillText("→", 200, this.game.height/2 + 250);


//CHRISTMAS TREE
  context.fillStyle = '#5C4033';
  context.fillRect(this.width-300, this.height-500, 10, 150);

  //TOP LEFT 
  context.fillStyle = 'red';
  context.fillRect(this.width-310, this.height-500, 8, 8);
  context.fillStyle = 'white';
  context.fillRect(this.width-320, this.height-485, 8, 8);
  context.fillStyle = 'red';
  context.fillRect(this.width-330, this.height-470, 8, 8);
  context.fillStyle = 'green';
  context.fillRect(this.width-340, this.height-455, 8, 8);

  //MIDDLE LEFT
  context.fillRect(this.width-310, this.height-460, 8, 8);
  context.fillStyle = 'red';
  context.fillRect(this.width-320, this.height-445, 8, 8);
  context.fillStyle = 'white';
  context.fillRect(this.width-330, this.height-430, 8, 8);
  context.fillStyle = 'green';
  context.fillRect(this.width-340, this.height-415, 8, 8);

  //BOTTOM LEFT
  context.fillStyle = 'white';
  context.fillRect(this.width-310, this.height-420, 8, 8);
  context.fillStyle = 'green';
  context.fillRect(this.width-320, this.height-405, 8, 8);
  context.fillStyle = 'red';
  context.fillRect(this.width-330, this.height-390, 8, 8);
  context.fillStyle = 'green';
  context.fillRect(this.width-340, this.height-375, 8, 8);
  

  //TOP RIGHT
  context.fillRect(this.width-288, this.height-500, 8, 8);
  context.fillStyle = 'red';
  context.fillRect(this.width-278, this.height-485, 8, 8);
  context.fillStyle = 'white';
  context.fillRect(this.width-268, this.height-470, 8, 8);
  context.fillStyle = 'green';
  context.fillRect(this.width-258, this.height-455, 8, 8);


  //MIDDLE RIGHT
  context.fillStyle = 'red';
  context.fillRect(this.width-288, this.height-460, 8, 8);
  context.fillStyle = 'green';
  context.fillRect(this.width-278, this.height-445, 8, 8);
  context.fillStyle = 'red';
  context.fillRect(this.width-268, this.height-430, 8, 8);
  context.fillStyle = 'green';
  context.fillRect(this.width-258, this.height-415, 8, 8);
  


  //BOTTOM RIGHT
  context.fillStyle = 'red';
  context.fillRect(this.width-288, this.height-420, 8, 8);
  context.fillStyle = 'white';
  context.fillRect(this.width-278, this.height-405, 8, 8);
  context.fillStyle = 'green';
  context.fillRect(this.width-268, this.height-390, 8, 8);
  context.fillStyle = 'white';
  context.fillRect(this.width-258, this.height-375, 8, 8);



  


  this.image = new Image();
  this.image.src = context.canvas.toDataURL("image/png");         

  context = null;


}

// draw the map adjusted to camera
Map.prototype.draw = function(context, camera){
  context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -camera.position.x, -camera.position.y, this.image.width, this.image.height);
}