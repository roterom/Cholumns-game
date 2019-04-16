function Piece(ctx, x, y, team, special, holded) {

  /*********arguments********** */
  this.ctx = ctx;
  this.x = x || ((NUM_COLUMNS_GRID * GEM_WIDTH) / 2);               //so that the piece falls through the middle of the grid
  this.y = y || -(GEM_HEIGTH * (PIECE_SIZE));
  this.team = team;
  this.isSpecial = special || false;
  this.isHolded = holded || false;

  this.w = GEM_WIDTH;
  this.h = GEM_HEIGTH * PIECE_SIZE;
  this.matrix = [];

  this.isEnabled = true;                                //this variable allows you to control when you get the next piece


  this.img = new Image();
  this.img.src = "";

  this.imgBg = new Image();
  this.imgBg.src = "./assets/images/recuadro-60.png"              //this image generates a shadow effect on the piece

  this.setImages(this.team);
}


Piece.prototype.setImages = function(team){

  switch (team) {
    case 0:
      this.img.src = "./assets/images/atleti-special.png";
      break;
      case 1:
      this.img.src = "./assets/images/atleti-special.png";
      break;
    case 2:
      this.img.src = "./assets/images/barsa-special.png";
      break;
  }
}


Piece.prototype.getPiece = function() {

  this.matrix = [];
  for (var i = 0; i < PIECE_SIZE; i++) {
    this.matrix.push(new Gem(this.ctx, this.team));
    if (this.isSpecial) {
      this.matrix[i].name = "#fff";
      this.matrix[i].img.row = 6;
      this.matrix[i].isMatched = true;
    } else {
      this.matrix[i].configColor();
      this.isSpecial = false;
    }
  }
}

Piece.prototype.draw = function() {

  this.ctx.drawImage(
    this.imgBg,
    this.x,
    this.y,
    this.w + 5, //for the shadow effect...
    this.h + 5  //for the shadow effect...
  );
  this.ctx.fill
   
  for (var i = 0; i < this.matrix.length; i++) {
    this.matrix[i].drawFilling(this.x, this.y + i*GEM_HEIGTH, GEM_WIDTH, GEM_HEIGTH);
    this.ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.lineWidth = 1;
    this.matrix[i].drawBorder(this.x, this.y + i*GEM_HEIGTH, GEM_WIDTH, GEM_HEIGTH); //
  }

  this.ctx.lineWidth = 3;
  this.ctx.strokeStyle = "rgba(0, 0, 0, 1.0)";
  this.ctx.strokeRect(this.x, this.y, this.w, this.h);
}


Piece.prototype.drawSpecial = function(numSpecials) {
  
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    GEM_WIDTH,
    GEM_HEIGTH
  );
  this.ctx.lineWidth = 3;
  this.ctx.strokeStyle = "rgba(0, 0, 0, 1.0)";
  this.ctx.strokeRect(this.x, this.y, GEM_WIDTH, GEM_HEIGTH);

  this.ctx.font = 'bold 40px Kalam';
  this.ctx.strokeStyle = "white";
  this.ctx.strokeText( "X " + numSpecials,this.x + POS_X_NUM_SPECIAL_PIECES, POS_Y_NUM_SPECIAL_PIECES);
}


Piece.prototype.place = function() {
  
  this.y = ((Math.floor((this.y + this.h)/GEM_HEIGTH) - PIECE_SIZE) * GEM_HEIGTH) + POS_Y_GRID;
}


Piece.prototype.switchColors = function() {
  
    this.matrix.unshift(this.matrix.pop());  
}


Piece.prototype.reset = function(next, canvasX, canvasY) {

  if (next) {  //if there is a next piece ...
    this.matrix = next.matrix;
    next.isEnabled = true;
    this.isSpecial = next.isSpecial;
  } else {
    this.getPiece();
  }
  this.x = ((NUM_COLUMNS_GRID * GEM_WIDTH) / 2) + POS_X_GRID + canvasX;          //so that the piece falls through the middle of the grid ..
  this.y = (-(GEM_HEIGTH * (PIECE_SIZE))) + POS_Y_GRID + canvasY;                //to start from the top of the grid ..
}

//function that pulls out a special piece
Piece.prototype.takeOutSpecial = function(special) {
  
    this.matrix = special.matrix.slice();
    this.isSpecial = true;
}
