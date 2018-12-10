function Grid(ctx,score, x, y, conexionDOM) {

  /*********arguments*********** */
  this.ctx = ctx;
  this.score = score;
  this.x = x || 0;
  this.y = y || 0;
  this.conexionDOM = conexionDOM;
  
  this.w = GEM_WIDTH * NUM_COLUMNS_GRID;
  this.h = GEM_HEIGTH * NUM_ROWS_GRID;
  
  this.matrix = [];

  this.hasMatches = false;
  this.isWorking = false;

  this.numExtraMatches = 0;
  this.numIterationMatches = 0;
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

  this.ctx.fillStyle = "rgba(255, 58, 0, 0.3)";
  this.ctx.fillRect(this.x, this.y, NUM_COLUMNS_GRID*GEM_WIDTH, NUM_ROWS_GRID*GEM_HEIGTH);
  
  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    for (var j = 0; j < NUM_ROWS_GRID; j++) {

      if (this.matrix[i][j] !== 0) {     
        this.matrix[i][j].drawFilling(this.x + i*GEM_WIDTH, this.y + j*GEM_HEIGTH, GEM_WIDTH, GEM_HEIGTH);
      }
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(this.x + i*GEM_WIDTH, this.y + j*GEM_HEIGTH, GEM_WIDTH, GEM_HEIGTH);
    }
  }
  this.ctx.lineWidth = 10;
  this.ctx.strokeStyle = "rgba(255, 255, 255, 1.0)";
  this.ctx.strokeRect(this.x, this.y, NUM_COLUMNS_GRID*GEM_WIDTH, NUM_ROWS_GRID*GEM_HEIGTH);
}


Grid.prototype.isCollisionRight = function(piece) {
    
  //si hay colisión permito moverme por encima de las piedras mientras dura el setTimeout correspondiente
  if (this.isCollisionDown(piece)) { 
  return ((piece.x + GEM_WIDTH === this.x + this.w) ||
         (this.matrix[((piece.x + GEM_WIDTH) - this.x)/GEM_WIDTH][Math.floor(((piece.y + ((PIECE_SIZE-1)*GEM_HEIGTH)) - this.y)/GEM_HEIGTH)] !== 0))
  } else {
    return ((piece.x + GEM_WIDTH === this.x + this.w) ||
         (this.matrix[((piece.x + GEM_WIDTH) - this.x)/GEM_WIDTH][Math.floor(((piece.y + (PIECE_SIZE*GEM_HEIGTH)) - this.y)/GEM_HEIGTH)] !== 0))
  }
}


Grid.prototype.isCollisionLeft = function(piece) {

  //si hay colisión permito moverme por encima de las piedras mientras dura el setTimeout correspondiente
  if (this.isCollisionDown(piece)) {
    return ((piece.x === this.x) ||
    (this.matrix[((piece.x - GEM_WIDTH) - this.x)/GEM_WIDTH][Math.floor(((piece.y + ((PIECE_SIZE-1)*GEM_HEIGTH)) - this.y)/GEM_HEIGTH)] !== 0));
  } else {
    return ((piece.x === this.x) ||
    (this.matrix[((piece.x - GEM_WIDTH) - this.x)/GEM_WIDTH][Math.floor(((piece.y + (PIECE_SIZE*GEM_HEIGTH)) - this.y)/GEM_HEIGTH)] !== 0)) 
  }
}


Grid.prototype.isCollisionDown = function(piece) {

  return (this.matrix[Math.floor((piece.x - this.x)/GEM_WIDTH)][Math.floor(((piece.y + piece.h) - this.y)/GEM_HEIGTH)] !== 0);
}


Grid.prototype.mergePiece = function(piece) {
 
  for (var i = 0; i < PIECE_SIZE; i++) {
    this.matrix[(piece.x - this.x)/GEM_WIDTH][((piece.y + i*GEM_HEIGTH)-this.y)/GEM_HEIGTH] = piece.matrix[i];
  }
}


Grid.prototype.remarkMatches = function() {
  
  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    for (var j = 0; j < NUM_ROWS_GRID; j++) {
      if (this.matrix[i][j] !== 0) {
        if (this.matrix[i][j].isMatched) {
            this.matrix[i][j].drawMatched((i*GEM_WIDTH + this.x) - ((GEM_WIDTH*1.2)-GEM_WIDTH)/2, (j*GEM_HEIGTH + this.y) - ((GEM_HEIGTH*1.2)-GEM_HEIGTH)/2, GEM_WIDTH*1.2, GEM_HEIGTH*1.2);
        }
      }
    }
  }
}


Grid.prototype.removeMatches = function() {
  
  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    for (var j = 0; j < NUM_ROWS_GRID; j++) {
      if ((this.matrix[i][j] !== 0) && (this.matrix[i][j].isMatched)) {
          this.matrix[i][j] = 0;
      }
    }
  }
}


Grid.prototype.removeChecks = function() {

  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    for (var j = 0; j < NUM_ROWS_GRID; j++) {
      if (this.matrix[i][j] !== 0) {
        for (var direction in this.matrix[i][j].checks) {
          this.matrix[i][j].checks[direction] = false;
        }
      }
    }
  }
}


Grid.prototype.downGems = function() {

  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    for (var j = 0; j < NUM_ROWS_GRID; j++) {
      if (this.matrix[i][j] == 0) {
        this.matrix[i].splice(j,1);
        this.matrix[i].unshift(0);
      }
    }
  }
}


Grid.prototype.removeColor = function(color) {
  
  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    for (var j = 0; j < NUM_ROWS_GRID; j++) {
      if (this.matrix[i][j].name === color) {
        this.matrix[i][j].isMatched = true;
        this.score.parcialPoints += POINTS_EXTRA;
      }
    }
  }
}


Grid.prototype.checkAllDirections = function(i, j) {
  
  this.checkVertically(i, j);
  if (this.numExtraMatches) {
    this.score.parcialPoints += POINTS_STANDAR * this.numExtraMatches * this.numIterationMatches; //si encuentro 4 piezas es el doble de puntos, 5 el triple...
    this.numExtraMatches = 0;
  }

  this.checkHorizontally(i, j);
  if (this.numExtraMatches) {
    this.score.parcialPoints += POINTS_STANDAR * this.numExtraMatches * this.numIterationMatches;
    this.numExtraMatches = 0;
  }

  this.checkDiagonally(i, j, 1);
  if (this.numExtraMatches) {
    this.score.parcialPoints += POINTS_STANDAR * this.numExtraMatches * this.numIterationMatches;
    this.numExtraMatches = 0;
  }

  this.checkDiagonally(i, j, -1);
  if (this.numExtraMatches) {
    this.score.parcialPoints += POINTS_STANDAR * this.numExtraMatches * this.numIterationMatches;
    this.numExtraMatches = 0;
  }
}


Grid.prototype.isInGrid = function(i, j) {
  return ((i < (NUM_COLUMNS_GRID)) && (i >= 0) &&
          (j < NUM_ROWS_GRID) && (j >= 0));
}


Grid.prototype.checkVertically = function (i, j) {

  if (!this.matrix[i][j].checks.vertical) {

    this.matrix[i][j].checks.vertical = true;
    
    if (this.isInGrid(i, j+1) && this.isInGrid(i, j-1)) {
      if ((this.matrix[i][j].name === this.matrix[i][j-1].name) &&
          (this.matrix[i][j].name === this.matrix[i][j+1].name)) {

        this.matrix[i][j].isMatched = true;
        this.matrix[i][j-1].isMatched = true;
        this.matrix[i][j+1].isMatched = true;

        this.hasMatches = true;
        this.numExtraMatches++; //para los puntos...
      }
    }  

    if (this.isInGrid(i, j+1) && (this.matrix[i][j+1] !== 0)) {
      if (!this.matrix[i][j+1].checks.vertical &&
          (this.matrix[i][j].name === this.matrix[i][j+1].name)) {
  
        this.checkVertically(i, j+1);
      }
    }
  }
}


Grid.prototype.checkHorizontally = function (i, j) {

  if (!this.matrix[i][j].checks.horizontal) {

    this.matrix[i][j].checks.horizontal = true;
  
    if (this.isInGrid(i+1, j) && this.isInGrid(i-1, j)) {
      if ((this.matrix[i][j].name === this.matrix[i-1][j].name) &&
          (this.matrix[i][j].name === this.matrix[i+1][j].name)) {

        this.matrix[i][j].isMatched = true;
        this.matrix[i-1][j].isMatched = true;
        this.matrix[i+1][j].isMatched = true;

        this.hasMatches = true;
        this.numExtraMatches++; //para los puntos....
      }
    } 

    if (this.isInGrid(i-1, j) && (this.matrix[i-1][j] !== 0)) {
      if (!this.matrix[i-1][j].checks.horizontal && 
          (this.matrix[i][j].name === this.matrix[i-1][j].name)) {

        this.checkHorizontally(i-1, j);
      }
    }

    if (this.isInGrid(i+1, j) && (this.matrix[i+1][j] !== 0)){
      if (!this.matrix[i+1][j].checks.horizontal &&
          (this.matrix[i][j].name === this.matrix[i+1][j].name)) {

        this.checkHorizontally(i+1, j);
      }
    }
  }
}


Grid.prototype.checkDiagonally = function (i,j, direction) {

  if (!this.matrix[i][j].checks["diagonal"+direction+1]) {

    this.matrix[i][j].checks["diagonal"+direction+1] = true;
  
    if(this.isInGrid(i+direction, j-1) && this.isInGrid(i-direction, j+1)) {
      if ((this.matrix[i][j].name === this.matrix[i-direction][j+1].name) &&
          (this.matrix[i][j].name === this.matrix[i+direction][j-1].name)) {
           
        this.matrix[i][j].isMatched = true;
        this.matrix[i-direction][j+1].isMatched = true;
        this.matrix[i+direction][j-1].isMatched = true;

        this.hasMatches = true;
        this.numExtraMatches++;   //para los puntos...
      }
    } 
    
    if (this.isInGrid(i-direction, j+1) && (this.matrix[i-direction][j+1] !== 0)) {
      if (!this.matrix[i-direction][j+1].checks["diagonal"+direction+1] && 
          (this.matrix[i][j].name === this.matrix[i-direction][j+1].name)) {

        this.checkDiagonally(i-direction, j+1, direction);
      }
    }

    if (this.isInGrid(i+direction, j-1) && (this.matrix[i+direction][j-1] !== 0)){
      if (!this.matrix[i+direction][j-1].checks["diagonal"+direction+1] &&
          (this.matrix[i][j].name === this.matrix[i+direction][j-1].name)) {
    
        this.checkDiagonally(i+direction, j-1, direction);
      }
    }
  }
}


Grid.prototype.handleMatches = function(piece) {

  this.isWorking = true;
  this.numIterationMatches++;

  if (piece) { //if this is the first iteration...there is piece

    if (piece.isSpecial) {
      this.hasMatches = true;

      if (this.isInGrid((piece.x - this.x)/GEM_WIDTH,(piece.y + piece.h)/GEM_HEIGTH)) {
        this.removeColor(this.matrix[(piece.x - this.x)/GEM_WIDTH][((piece.y + piece.h) - this.y)/GEM_HEIGTH].name);
      }
    } else {

      for (var i = 0; i < PIECE_SIZE; i++) {
        this.checkAllDirections((piece.x - this.x)/GEM_WIDTH, Math.floor((piece.y + (GEM_HEIGTH * i))/GEM_HEIGTH));
      } 
    }
  } else { // if this is not the first iteration...we have to check all grid

    for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
      for (var j = 0; j < NUM_ROWS_GRID; j++) {
        if (this.matrix[i][j] !== 0) {
          this.checkAllDirections((i * GEM_WIDTH)/GEM_WIDTH, (j * GEM_HEIGTH)/GEM_HEIGTH);
        }
      }
    }
  }

  this.removeChecks();
  
  if (this.hasMatches) {

    this.conexionDOM.$soundEvents[0].src = "./assets/sound/events/success.m4a";
    this.hasMatches = false;
    
    setTimeout(function() {
      this.score.totalPoints += this.score.parcialPoints;
      this.score.parcialPoints = 0;
      this.removeMatches();
      this.downGems();
      this.handleMatches();
    }.bind(this), DELAY_AFTER_MATCHES);
    
  } else {
    this.isWorking = false;
    this.numIterationMatches = 0;
  }
}