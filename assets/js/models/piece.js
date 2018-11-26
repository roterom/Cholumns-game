function Piece(ctx) {

  this.ctx = ctx;
  this.x = 0;
  this.y = 0;

  this.w = GEM_WIDTH;
  this.h = GEM_HEIGTH * PIECE_SIZE;
  this.matrix = [];

  //this.setListeners();
}

/* Piece.prototype.setListeners = function() {
  document.onkeydown = this.onKeyDown.bind(this);
}

Piece.prototype.onKeyDown = function(e) {
  switch (e.keyCode) {
    case KEY_RIGHT:
      this.x += 50;
      break;
    case KEY_LEFT:
      this.x += -50;
      break;
    case KEY_DOWN:
      this.y += 25;
      break;
    case KEY_SPACE:
      this.switchColors();
      break;
  }
}; */

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

Piece.prototype.switchColors = function() {
  
    this.matrix.unshift(this.matrix.pop());
}

Piece.prototype.reset = function() {
  this.x = 0;
  this.y = 0;
  this.matrix = [];
  this.getPiece();
}