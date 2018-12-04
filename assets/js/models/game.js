function Game(canvas1 , canvas2) {
  
  this.player1 = new Player(canvas1, CONTROLS1, 0, 0);
  this.player2 = new Player(canvas2, CONTROLS2, window.innerWidth/2 , 0);
}

Game.prototype.start = function() {
  
  this.player1.start();
  //this.player2.start();
}