function Game(canvasId) {
  this.ctx = canvasId.getContext("2d");

  this.w = this.ctx.canvas.width;
  this.h = this.ctx.canvas.height;

  this.grid = new Grid(this.ctx);
  this.piece = new Piece(this.ctx);

  this.drawCount = 0;

}

Game.prototype.start = function() {
  this.grid.reset();
  this.piece.getPiece();
  drawIntervalId = setInterval(function() {
    this.drawCount++;

    this.clearAll();
    this.checkCollisions();
    this.drawAll();
    
    if ((this.drawCount % 30) === 0) {
      this.piece.y += 10;
    }

  }.bind(this), DRAW_INTERVAL_MS);

}

Game.prototype.stop = function() {


}

Game.prototype.drawAll = function() {
  this.grid.draw();
  this.piece.draw();

}

Game.prototype.clearAll = function() {
  this.ctx.clearRect(0, 0, this.w, this.h);
}

Game.prototype.checkCollisions = function() {
  
  if (this.piece.x < this.grid.x) {
    this.piece.x += GEM_WIDTH;
  }
  if (this.piece.x + GEM_WIDTH > this.grid.x + this.grid.w) {
    this.piece.x -= GEM_WIDTH;
  }
  if ((this.piece.y + this.piece.h) > (this.grid.y + this.grid.h)) {
    this.piece.y = (this.grid.y + this.grid.h) - this.piece.h;
    this.grid.mergePiece(this.piece);
  }

}