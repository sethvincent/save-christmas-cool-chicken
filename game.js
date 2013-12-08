var Game = require('crtrdg-gameloop');
var Keyboard = require('crtrdg-keyboard');
var Mouse = require('crtrdg-mouse');
var Scenes = require('crtrdg-scene');
var Goals = require('crtrdg-goal');

var Map = require('./map');
var Camera = require('./camera');
var Player = require('./player');
var Chicken = require('./chicken');
var Snow = require('./snow');

var randomRGB = require('./util/math').randomRGB;
var randomInt = require('./util/math').randomInt;

var game = new Game({
  canvas: 'game',
  width: window.innerWidth,
  height: window.innerHeight
});

var keyboard = new Keyboard(game);
var mouse = new Mouse(game);

/*
*
* PLAYER
*
*/

var player = new Player({
  game: game,
  keyboard: keyboard,
  camera: camera
});

player.addTo(game);

mouse.on('click', function(e){});

player.on('update', function(interval){
  if (chickens.length > 0){
    for (var i=0; i<chickens.length; i++){
      if (player.touches(chickens[i])){
        //window.location = 'http://img.izismile.com/img/img2/20091201/chicken_across_the_world_05.jpg';
        //game.pause();
        player.color = randomRGB(0, 256, 0, 256, 0, 256);
      }
    }
  }

  if (player.position.x >= map.width - 340 && player.position.x <= map.width - 250){
    if (player.position.y > map.height - 520 && player.position.y < map.height - 350){
      //window.location = 'http://www.youtube.com/watch?v=2O6Qy-Bhyqs&feature=youtu.be&t=1m46s'
      //game.pause();
    }
  }
});

game.on('update', function(interval){

});

game.on('draw-background', function(context){
  context.fillStyle = 'rgb(100, 200, 150)';
  context.fillRect(0, 0, game.width, game.height);
  map.draw(context, camera);
});

game.on('draw', function(context){
  
});

game.on('pause', function(){
  //console.log('paused');
});

game.on('resume', function(){
  //console.log('resumed');
});


/*
*
* MAP & CAMERA
*
*/

var map = new Map(game, 10000, game.height);
map.generate();

var camera = new Camera({
  game: game,
  follow: player,
  followPoint: { x: game.width / 2 },
  viewport: { width: game.width, height: game.height },
  map: map
});


/*
*
* CHICKENS
*
*/

var chickens = [];
for (var i=0; i<=100; i++){
  chickens[i] = new Chicken({
    game: game,
    camera: camera,
    map: map,
    position: {
      x: randomInt(1250, map.width),
      y: randomInt(0, 200)
    }
  }).addTo(game);
}


/*
*
* SNOW
*
*/

window.setInterval(function(){
  new Snow({ camera: camera, x: randomInt(0, game.width )}).addTo(game);
}, 300);