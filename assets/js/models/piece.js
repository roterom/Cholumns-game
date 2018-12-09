function Piece(ctx, x, y, team, special, holded) {

  this.ctx = ctx;
  this.x = x || ((NUM_COLUMNS_GRID * GEM_WIDTH) / 2); //para que empiece en la mitad
  this.y = y || -(GEM_HEIGTH * (PIECE_SIZE));
  this.team = team;

 

  this.w = GEM_WIDTH;
  this.h = GEM_HEIGTH * PIECE_SIZE;
  this.matrix = [];

  this.isEnabled = true;

  this.isSpecial = special || false;
  this.isHolded = holded || false;

  this.img = new Image();
  //this.img.src = "./assets/images/simeone-special.png";
  this.img.src = "";

  this.imgBg = new Image();
  this.imgBg.src = "./assets/images/recuadro-60.png"

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
    //this.matrix.push(new Gem(this.ctx, this.x, (this.y + i*GEM_WIDTH))); comento para probar la eleccion de equipos
    this.matrix.push(new Gem(this.ctx, this.team, this.x, (this.y + i*GEM_WIDTH)));
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
    this.w + 5,
    this.h + 5
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

  // this.matrix[0].drawFilling(this.x, this.y, GEM_WIDTH, GEM_HEIGTH);
  this.ctx.lineWidth = 3;
  this.ctx.strokeStyle = "rgba(0, 0, 0, 1.0)";
  this.ctx.strokeRect(this.x, this.y, GEM_WIDTH, GEM_HEIGTH);

  this.ctx.font = 'bold 40px Kalam';
  this.ctx.strokeStyle = "white";
  this.ctx.strokeText( "X " + numSpecials,this.x+105, 920);
}

//PROBANDO LOS 2 PLAYEERRSSS
/* Piece.prototype.place = function() {
  
  this.y = (Math.floor((this.y + this.h)/GEM_HEIGTH) - PIECE_SIZE) * GEM_HEIGTH;
} */

Piece.prototype.place = function() {
  
  this.y = ((Math.floor((this.y + this.h)/GEM_HEIGTH) - PIECE_SIZE) * GEM_HEIGTH) + POS_Y_GRID;
}


Piece.prototype.switchColors = function() {
  
    this.matrix.unshift(this.matrix.pop());
 
    //this.matrix.push(this.matrix.shift()); 
   
  
}

//PARA INTENTAR HACER LOS 2 PLAYERRSSSS
/* Piece.prototype.reset = function(next) {

  if (next) {
    this.matrix = next.matrix;
    next.isEnabled = true;
    this.isSpecial = next.isSpecial;
  } else {
    this.getPiece();
  }
  this.x = (NUM_COLUMNS_GRID * GEM_WIDTH) / 2; //para que empiece en la mitad
  this.y = -(GEM_HEIGTH * (PIECE_SIZE)); 
} */

Piece.prototype.reset = function(next, canvasX, canvasY) {

  if (next) {
    this.matrix = next.matrix;
    next.isEnabled = true;
    this.isSpecial = next.isSpecial;
  } else {
    this.getPiece();
  }
  this.x = ((NUM_COLUMNS_GRID * GEM_WIDTH) / 2) + POS_X_GRID + canvasX; //para que empiece en la mitad
  this.y = (-(GEM_HEIGTH * (PIECE_SIZE))) + POS_Y_GRID + canvasY; 
}

Piece.prototype.takeOutSpecial = function(special) {
  
    this.matrix = special.matrix.slice();
    this.isSpecial = true;
}
