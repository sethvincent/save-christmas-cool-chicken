var Game = require('crtrdg-gameloop');
var Keyboard = require('crtrdg-keyboard');
var Mouse = require('crtrdg-mouse');
var Scenes = require('crtrdg-scene');
var Goals = require('crtrdg-goal');

var Map = require('./map');
var Camera = require('./camera');
var Player = require('./player');
var Chicken = require('./chicken');

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
        console.log(window)
        window.location = 'http://img.izismile.com/img/img2/20091201/chicken_across_the_world_05.jpg';
        player.color = randomRGB(0, 256, 0, 256, 0, 256);
      }
    }
  }
});

game.on('update', function(interval){});

game.on('draw-background', function(context){
  context.fillStyle = 'rgb(100, 200, 150)';
  context.fillRect(0, 0, game.width, game.height);
  map.draw(context, camera);
});

game.on('draw', function(context){
  
});

game.on('pause', function(){
  console.log('paused');
});

game.on('resume', function(){
  console.log('resumed');
});


/*
*
* MAP & CAMERA
*
*/

var map = new Map(game, 8000, game.height);
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
  console.log(i)

  chickens[i] = new Chicken({
    game: game,
    camera: camera,
    map: map,
    position: {
      x: randomInt(1500, map.width),
      y: randomInt(0, 200)
    }
  }).addTo(game);
}
