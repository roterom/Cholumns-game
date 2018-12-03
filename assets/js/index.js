document.addEventListener("DOMContentLoaded", function() {
  canvas = document.getElementById("canvas-player1");
  canvas2 = document.getElementById("canvas-player2");
  
  var controls1 = {
    right: 68,
    left: 65,
    down: 83,
    switchC: 32,
    specialKey: 86,
    holdedKey: 66,
  }

  var player1 = new Player(canvas, controls1, 0, 0);
  // var controls = {
  //   right: 39 || KEY_RIGHT,
  //   left: 37 || KEY_LEFT,
  //   down: 40 || KEY_DOWN,
  //   switchC: 96 || KEY_SPACE,
  //   specialKey: 97 || KEY_ALT_GRAPH,
  //   holdedKey: 98 || KEY_CONTROL,
  // }

  var controls2 = {
    right: 39,
    left: 37,
    down: 40,
    switchC: 96,
    specialKey: 97,
    holdedKey: 98,
  }
  //var player2 = new Player(canvas, controls, window.innerWidth/2 , 0);
  var player2 = new Player(canvas2, controls2, window.innerWidth/2 , 0);

  player1.start();
  player2.start();
})