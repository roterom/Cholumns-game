document.addEventListener("DOMContentLoaded", function() {
  canvas1 = document.getElementById("canvas-player1");
  canvas2 = document.getElementById("canvas-player2");
  
 /*  var controls1 = {
    right: 70,
    left: 83,
    down: 68,
    switchC: 69,
    specialKey: 16,
    holdedKey: 220
  } */

  //var player1 = new Player(canvas, controls1, 0, 0);
  // var controls = {
  //   right: 39 || KEY_RIGHT,
  //   left: 37 || KEY_LEFT,
  //   down: 40 || KEY_DOWN,
  //   switchC: 96 || KEY_SPACE,
  //   specialKey: 97 || KEY_ALT_GRAPH,
  //   holdedKey: 98 || KEY_CONTROL,
  // }

  // var controls2 = {
  //   right: 102,
  //   left: 100,
  //   down: 101,
  //   switchC: 104,
  //   specialKey: 16,
  //   holdedKey: 189,
  // }
  //var player2 = new Player(canvas, controls, window.innerWidth/2 , 0);
  //var player2 = new Player(canvas2, controls2, window.innerWidth/2 , 0);

  /* player1.start();
  player2.start(); */

  var game = new Game(canvas1, canvas2);

  game.start();
})