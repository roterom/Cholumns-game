document.addEventListener("DOMContentLoaded", function() {
  canvas = document.getElementById("main-canvas");
  var game = new Game(canvas);
  game.start();
})