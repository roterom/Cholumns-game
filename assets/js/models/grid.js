function Grid(ctx,score, x, y, conexionDOM) {

  /*********arguments*********** */
  this.ctx = ctx;
  this.score = score;
  this.x = x || 0;
  this.y = y || 0;
  this.conexionDOM = conexionDOM;
  
  this.w = GEM_WIDTH * NUM_COLUMNS_GRID;
  this.h = GEM_HEIGTH * NUM_ROWS_GRID;
  
  this.matrix = [];             //in this matrix the game grid will be represented

  this.hasMatches = false;     //variable that determines if there are coincidences in the grid
  this.isWorking = false;      //variable that determines if the grid is working (because there have been coincidences...)
 
  this.numExtraMatches = 0;          //variable for the calculation of points ...
  this.numIterationMatches = 0;      //variable for the calculation of points ...
}

//function that fills the entire grid with "0"
Grid.prototype.reset= function() {

  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    this.matrix.push([])
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
    
  if (this.isCollisionDown(piece)) {  //If there is a collision below, we can move on the gems for a few moments (during the corresponding srtTimeOut) ...
  return ((piece.x + GEM_WIDTH === this.x + this.w) ||
         (this.matrix[((piece.x + GEM_WIDTH) - this.x)/GEM_WIDTH][Math.floor(((piece.y + ((PIECE_SIZE-1)*GEM_HEIGTH)) - this.y)/GEM_HEIGTH)] !== 0))
  } else {  //if there is no collision below ...
    return ((piece.x + GEM_WIDTH === this.x + this.w) ||
         (this.matrix[((piece.x + GEM_WIDTH) - this.x)/GEM_WIDTH][Math.floor(((piece.y + (PIECE_SIZE*GEM_HEIGTH)) - this.y)/GEM_HEIGTH)] !== 0))
  }
}


Grid.prototype.isCollisionLeft = function(piece) {

  if (this.isCollisionDown(piece)) {  //If there is a collision below, we can move on the gems for a few moments (during the corresponding srtTimeOut) ...
    return ((piece.x === this.x) ||
    (this.matrix[((piece.x - GEM_WIDTH) - this.x)/GEM_WIDTH][Math.floor(((piece.y + ((PIECE_SIZE-1)*GEM_HEIGTH)) - this.y)/GEM_HEIGTH)] !== 0));
  } else {  //if there is no collision below ...
    return ((piece.x === this.x) ||
    (this.matrix[((piece.x - GEM_WIDTH) - this.x)/GEM_WIDTH][Math.floor(((piece.y + (PIECE_SIZE*GEM_HEIGTH)) - this.y)/GEM_HEIGTH)] !== 0)) 
  }
}


Grid.prototype.isCollisionDown = function(piece) {

  return (this.matrix[Math.floor((piece.x - this.x)/GEM_WIDTH)][Math.floor(((piece.y + piece.h) - this.y)/GEM_HEIGTH)] !== 0);
}

//function that links the piece to the grid
Grid.prototype.mergePiece = function(piece) {
 
  for (var i = 0; i < PIECE_SIZE; i++) {
    this.matrix[(piece.x - this.x)/GEM_WIDTH][((piece.y + i*GEM_HEIGTH)-this.y)/GEM_HEIGTH] = piece.matrix[i];
  }
}

//function that draws the images of the matched gems
Grid.prototype.remarkMatches = function() {
  
  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    for (var j = 0; j < NUM_ROWS_GRID; j++) {
      if (this.matrix[i][j] !== 0) {
        if (this.matrix[i][j].isMatched) {
            this.matrix[i][j].drawMatched((i*GEM_WIDTH + this.x) - ((GEM_WIDTH*SCALE_MATCHED)-GEM_WIDTH)/2, (j*GEM_HEIGTH + this.y) - ((GEM_HEIGTH*SCALE_MATCHED)-GEM_HEIGTH)/2, GEM_WIDTH*SCALE_MATCHED, GEM_HEIGTH*SCALE_MATCHED);
        }
      }
    }
  }
}

//function that removes the matched gems of the grid
Grid.prototype.removeMatches = function() {
  
  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    for (var j = 0; j < NUM_ROWS_GRID; j++) {
      if ((this.matrix[i][j] !== 0) && (this.matrix[i][j].isMatched)) {
          this.matrix[i][j] = 0;
      }
    }
  }
}

//function that initializes the checks that have been made of each cell
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

//function that eliminates the cells that contain zero and insert a new zero at the beginning of the colunm
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

//function that looks for the gems of the same color as the one chosen by the special piece
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

//function that checks all direcions for matches
Grid.prototype.checkAllDirections = function(i, j) {
  
  this.checkVertically(i, j);                      //call the function "checkVertically" to review vertically
  if (this.numExtraMatches) {
    this.score.parcialPoints += POINTS_STANDAR * this.numExtraMatches * this.numIterationMatches; //we calculate the points obtained from that success
    this.numExtraMatches = 0;
  }

  this.checkHorizontally(i, j);                    //call the function"checkHorizontally" to review horizontally
  if (this.numExtraMatches) {
    this.score.parcialPoints += POINTS_STANDAR * this.numExtraMatches * this.numIterationMatches;  //we calculate the points obtained from that success
    this.numExtraMatches = 0;
  }

  this.checkDiagonally(i, j, 1);                    //call the function"checkDiagonally" to review diagonally (we pass as an argument the flag ("1") to check a diagonal..)
  if (this.numExtraMatches) {
    this.score.parcialPoints += POINTS_STANDAR * this.numExtraMatches * this.numIterationMatches;  //we calculate the points obtained from that success
    this.numExtraMatches = 0;
  }

  this.checkDiagonally(i, j, -1);                   //call the function"checkDiagonally" to review diagonally (we pass as an argument the flag ("-1") to check the other diagonal)
  if (this.numExtraMatches) {
    this.score.parcialPoints += POINTS_STANDAR * this.numExtraMatches * this.numIterationMatches;  //we calculate the points obtained from that success
    this.numExtraMatches = 0;
  }
}

//function that checks if a certain position belongs to the grid
Grid.prototype.isInGrid = function(i, j) {
  return ((i < (NUM_COLUMNS_GRID)) && (i >= 0) &&
          (j < NUM_ROWS_GRID) && (j >= 0));
}


Grid.prototype.checkVertically = function (i, j) {  

  if (!this.matrix[i][j].checks.vertical) {  //if the cell has not been vertical checked yet

    this.matrix[i][j].checks.vertical = true;
    
    if (this.isInGrid(i, j+1) && this.isInGrid(i, j-1)) {  //if this cell, the one above and the one below are the same ...
      if ((this.matrix[i][j].name === this.matrix[i][j-1].name) &&
          (this.matrix[i][j].name === this.matrix[i][j+1].name)) {

        this.matrix[i][j].isMatched = true;
        this.matrix[i][j-1].isMatched = true;
        this.matrix[i][j+1].isMatched = true;

        this.hasMatches = true;
        this.numExtraMatches++; //for the calculation of points ...
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

  if (!this.matrix[i][j].checks.horizontal) {  //if the cell has not been horizontal checked yet

    this.matrix[i][j].checks.horizontal = true;
  
    if (this.isInGrid(i+1, j) && this.isInGrid(i-1, j)) {  //if this cell, the one on the right and the one on the left are the same ...
      if ((this.matrix[i][j].name === this.matrix[i-1][j].name) &&
          (this.matrix[i][j].name === this.matrix[i+1][j].name)) {

        this.matrix[i][j].isMatched = true;
        this.matrix[i-1][j].isMatched = true;
        this.matrix[i+1][j].isMatched = true;

        this.hasMatches = true;
        this.numExtraMatches++; //for the calculation of points ...
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

  if (!this.matrix[i][j].checks["diagonal"+direction+1]) {  //if the cell has not been diagonal checked yet

    this.matrix[i][j].checks["diagonal"+direction+1] = true;
  
    if(this.isInGrid(i+direction, j-1) && this.isInGrid(i-direction, j+1)) {  //if this cell, the one on the right/up and the one on the left/down are the same ... (or right/down and left/up...depending of "direction")
      if ((this.matrix[i][j].name === this.matrix[i-direction][j+1].name) &&
          (this.matrix[i][j].name === this.matrix[i+direction][j-1].name)) {
           
        this.matrix[i][j].isMatched = true;
        this.matrix[i-direction][j+1].isMatched = true;
        this.matrix[i+direction][j-1].isMatched = true;

        this.hasMatches = true;
        this.numExtraMatches++;   //for the calculation of points ...
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

    if (piece.isSpecial) {  //if it is a special piece ...
      this.hasMatches = true;

      if (this.isInGrid((piece.x - this.x)/GEM_WIDTH,(piece.y + piece.h)/GEM_HEIGTH)) {
        this.removeColor(this.matrix[(piece.x - this.x)/GEM_WIDTH][((piece.y + piece.h) - this.y)/GEM_HEIGTH].name);
      }
    } else {  //if it is a normal piece ...

      for (var i = 0; i < PIECE_SIZE; i++) {  //for each of the gems of that piece ...
        this.checkAllDirections((piece.x - this.x)/GEM_WIDTH, Math.floor((piece.y + (GEM_HEIGTH * i))/GEM_HEIGTH));
      } 
    }
  } else { // if this is not the first iteration...we have to check all grid

    for (var i = 0; i < NUM_COLUMNS_GRID; i++) {  //for each of the gems of the grid ...
      for (var j = 0; j < NUM_ROWS_GRID; j++) {
        if (this.matrix[i][j] !== 0) {
          this.checkAllDirections((i * GEM_WIDTH)/GEM_WIDTH, (j * GEM_HEIGTH)/GEM_HEIGTH);
        }
      }
    }
  }

  this.removeChecks();
  
  if (this.hasMatches) {  //if matches have been found ...

    this.conexionDOM.$soundSuccess[0].src = "./assets/sound/events/success.m4a";
    this.hasMatches = false;
    
    setTimeout(function() {
      this.score.totalPoints += this.score.parcialPoints;
      this.score.parcialPoints = 0;
      this.removeMatches();
      this.downGems();
      this.handleMatches();                   //we call back to the function in search of more coincidences
    }.bind(this), DELAY_AFTER_MATCHES);
    
  } else {
    this.isWorking = false;
    this.numIterationMatches = 0;
  }
}