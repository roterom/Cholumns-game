function Piece(ctx, x, y, special, holded) {

  this.ctx = ctx;
  this.x = x || ((NUM_COLUMNS_GRID * GEM_WIDTH) / 2); //para que empiece en la mitad
  this.y = y || -(GEM_HEIGTH * (PIECE_SIZE - 1)); //que solo asome una gema al principio

  this.w = GEM_WIDTH;
  this.h = GEM_HEIGTH * PIECE_SIZE;
  this.matrix = [];

  this.isEnabled = false;

  this.isSpecial = special || false;
  this.isHolded = holded || false;
  //this.setListeners();
}

Piece.prototype.getPiece = function() {

  this.matrix = [];
  for (var i = 0; i < PIECE_SIZE; i++) {
    this.matrix.push(new Gem(this.ctx, this.x, (this.y + i*GEM_WIDTH)));
    if (this.isSpecial) {
      this.matrix[i].name = "#fff";
      this.matrix[i].row = 6;
      this.matrix[i].isMatched = true;
    } else {
      this.matrix[i].configColor();
      this.isSpecial = false;
    }
  }
}


Piece.prototype.draw = function() {
  
  for (var i = 0; i < this.matrix.length; i++) {

    this.matrix[i].drawFilling(this.x, this.y + i*GEM_HEIGTH, GEM_WIDTH, GEM_HEIGTH);

    this.ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.lineWidth = 1;
    this.matrix[i].drawBorder(this.x, this.y + i*GEM_HEIGTH, GEM_WIDTH, GEM_HEIGTH);
   // this.ctx.strokeRect(this.x, this.y + i*GEM_HEIGTH, GEM_WIDTH, GEM_HEIGTH);
    
    // if (this.matrix[i].img.src !== "") {
    //   this.ctx.drawImage(this.matrix[i].img, this.x, this.y + i*50, 50, 50);
    // } else {
      
    //   this.ctx.fillStyle = this.matrix[i].name;
    //   this.ctx.fillRect(this.x, this.y + i*50, 50, 50);
    // }
  }

  this.ctx.lineWidth = 3;
  this.ctx.strokeStyle = "rgba(0, 0, 0, 1.0)";
  this.ctx.strokeRect(this.x, this.y, this.w, this.h);
}

Piece.prototype.place = function() {
  
  this.y = (Math.floor((this.y + this.h)/GEM_HEIGTH) - PIECE_SIZE) * GEM_HEIGTH;
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
    this.isSpecial = next.isSpecial;
    //next.getPiece();
  } else {
    this.getPiece();
  }
  this.x = (NUM_COLUMNS_GRID * GEM_WIDTH) / 2; //para que empiece en la mitad
  this.y = -(GEM_HEIGTH * (PIECE_SIZE - 1)); //que solo asome una gema al principio
}

Piece.prototype.takeOutCholo = function(special) {
  this.matrix = special.matrix;
  this.isSpecial = true;
}

Piece.prototype.takeOutHolded = function(holded) {
  
  var auxMatrix = this.matrix;
  this.matrix = holded.matrix;

  //this.isSpecial = true;
}
  
