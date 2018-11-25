function Game(canvasId) {
  this.ctx = canvasId.getContext("2d");

  this.grid = new Grid(this.ctx);
  this.piece = new Piece(this.ctx);

}

Game.prototype.start = function() {
  this.grid.reset();
  this.grid.draw();
  this.piece.getPiece();
  this.piece.draw();

}

Game.prototype.stop = function() {

}

Game.prototype.drawAll = function() {

}

Game.prototype.clearAll = function() {

}