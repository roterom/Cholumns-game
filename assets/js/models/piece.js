function Piece(ctx, x, y) {

  this.ctx = ctx;
  this.x = x || ((NUM_COLUMNS_GRID * GEM_WIDTH) / 2); //para que empiece en la mitad
  this.y = y || -(GEM_HEIGTH * (PIECE_SIZE - 1)); //que solo asome una gema al principio

  this.w = GEM_WIDTH;
  this.h = GEM_HEIGTH * PIECE_SIZE;
  this.matrix = [];

  this.isEnabled = false;
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

  this.matrix = [];
  for (var i = 0; i < PIECE_SIZE; i++) {
    this.matrix.push(new Gem(this.ctx, this.x, (this.y + i*GEM_WIDTH)));
    this.matrix[i].configColor();
  }
}

Piece.prototype.draw = function() {
  
  for (var i = 0; i < this.matrix.length; i++) {

    this.matrix[i].draw(this.x, this.y + i*GEM_HEIGTH);
    
    // if (this.matrix[i].img.src !== "") {
    //   this.ctx.drawImage(this.matrix[i].img, this.x, this.y + i*50, 50, 50);
    // } else {
      
    //   this.ctx.fillStyle = this.matrix[i].name;
    //   this.ctx.fillRect(this.x, this.y + i*50, 50, 50);
    // }
  }
}

Piece.prototype.switchColors = function() {
  
    this.matrix.unshift(this.matrix.pop());
}

Piece.prototype.reset = function(next) {

  /* //esto sé que funciona. lo comento para ver si puedo generar la ficha sigueinte
  this.x = (NUM_COLUMNS_GRID * GEM_WIDTH) / 2; //para que empiece en la mitad
  this.y = -(GEM_HEIGTH * (PIECE_SIZE - 1)); //que solo asome una gema al principio
  this.matrix = [];
  this.getPiece(); */

  if (next) {
    this.matrix = next.matrix;
    next.isEnabled = true;
    //next.getPiece();
  } else {
    this.getPiece();
  }
  this.x = (NUM_COLUMNS_GRID * GEM_WIDTH) / 2; //para que empiece en la mitad
  this.y = -(GEM_HEIGTH * (PIECE_SIZE - 1)); //que solo asome una gema al principio
  
}