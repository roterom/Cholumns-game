function Grid(ctx) {
  this.ctx = ctx;

  this.x = 0;
  this.y = 0;
  
  this.w = GEM_WIDTH * NUM_COLUMNS_GRID;
  this.h = GEM_HEIGTH * NUM_ROWS_GRID

  this.matrix = [];
}

Grid.prototype.reset= function() {

  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    this.matrix.push([]);
    for (var j = 0; j < NUM_ROWS_GRID; j++) {
      this.matrix[i].push(0);
    }
  }
}

Grid.prototype.draw = function() {

  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    for (var j = 0; j < NUM_ROWS_GRID; j++) {
      if (this.matrix[i][j] !== 0) {
        this.ctx.fillStyle = this.matrix[i][j].name;
        this.ctx.fillRect(this.x + i*50, this.y + j*50, 50, 50);
      }
      this.ctx.fillStyle = "#000";
      this.ctx.strokeRect(this.x + i*50, this.y + j*50, 50, 50);
    }
  }
}

Grid.prototype.mergePiece = function(piece) {

  for (var i = 0; i < PIECE_SIZE; i++) {
    this.matrix[piece.x/GEM_WIDTH][(piece.y + i*GEM_HEIGTH)/GEM_HEIGTH] = piece.matrix[i];
  }
}

Grid.prototype.findMatches = function(piece) {

  for (var i = 0; i < PIECE_SIZE; i++) {
    this.checkVertically(piece.x, piece.y + (GEM_HEIGTH * i));
  }
}


Grid.prototype.checkVertically = function (x, y) {

  if (!this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical) {

    this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical= true;
  
    if (((y + GEM_HEIGTH) < this.h) && ((y - GEM_HEIGTH) >= this.y)) {
      if ((this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[x/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].name) &&
          (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[x/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].name)) {
            this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].hasMatched = true;
            this.matrix[x/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].hasMatched = true;
            this.matrix[x/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].hasMatched = true;
      }
    } 

    if (((y - GEM_HEIGTH) >= this.y) && (this.matrix[x/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH] !== 0)) {
      if ((this.matrix[x/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].checks.vertical === false) && 
      (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[x/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].name)) {
        this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical = true;
        this.checkVertically(x, y - GEM_HEIGTH);
      }
  }
    if (((y + GEM_HEIGTH) < this.h) && (this.matrix[x/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH] !== 0)){
      if ((this.matrix[x/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].checks.vertical === false) &&
        (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[x/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].name)) {
        this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical = true;
        this.checkVertically(x, y + GEM_HEIGTH);
      }
    }
  }
}

Grid.prototype.removeMatches = function() {
  
  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    for (var j = 0; j < NUM_ROWS_GRID; j++) {
      if ((this.matrix[i* GEM_WIDTH][j*GEM_HEIGTH] !== 0) && (this.matrix[i* GEM_WIDTH][j*GEM_HEIGTH].hasMatched === true)) {
        this.matrix[i* GEM_WIDTH][j*GEM_HEIGTH] = 0;
      }
    }
  }
}
