document.addEventListener("DOMContentLoaded", function() {
  canvas = document.getElementById("main-canvas");
  var player1 = new Player(canvas);
  player1.start();
})