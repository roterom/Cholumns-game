function Piece(ctx) {

  this.ctx = ctx;
  this.x = 0;
  this.y = 0;
  this.matrix = [];
}

Piece.prototype.getPiece = function() {

  for (var i = 0; i < PIECE_SIZE; i++) {
    this.matrix.push(new Gem());
    this.matrix[i].configColor();
  }
}

Piece.prototype.draw = function() {
  
  for (var i = 0; i < this.matrix.length; i++) {
    this.ctx.fillStyle = this.matrix[i].name;
    this.ctx.fillRect(this.x, this.y + i*50, 50, 50)
  }
}
