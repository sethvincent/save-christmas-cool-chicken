var Game = require('crtrdg-gameloop');
var Keyboard = require('crtrdg-keyboard');
var Mouse = require('crtrdg-mouse');
var Scenes = require('crtrdg-scene');
var Goals = require('crtrdg-goal');

var Map = require('./map');
var Camera = require('./camera');
var Player = require('./player');
var Chicken = require('./chicken');

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


mouse.on('click', function(e){
  var c = new Chicken({
    camera: camera,
    map: map,
    position: {
      x: e.x + camera.position.x,
      y: e.y
    }
  });
  c.addTo(game);
});



game.on('update', function(interval){});

game.on('draw-background', function(context){
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

var map = new Map(game, 2000, game.height);
map.generate();

var camera = new Camera({
  game: game,
  follow: player,
  followPoint: { x: game.width / 2 },
  viewport: { width: game.width, height: game.height },
  map: map
});