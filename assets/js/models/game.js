function Game(canvasId) {
  this.ctx = canvasId.getContext("2d");

  this.grid = new Grid(this.ctx);

}

Game.prototype.start = function() {
  this.grid.reset();
  this.grid.draw();

}

Game.prototype.stop = function() {

}

Game.prototype.drawAll = function() {

}

Game.prototype.clearAll = function() {

}