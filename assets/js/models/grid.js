function Grid(ctx,score) {
  this.ctx = ctx;
  this.score = score;

  this.w = GEM_WIDTH * NUM_COLUMNS_GRID;
  this.h = GEM_HEIGTH * NUM_ROWS_GRID;

  this.x = 0;
  this.y = 0;//(this.ctx.canvas.height / 2) - (this.h / 2);
  
  this.matrix = [];

  this.hasMatches = false;
  this.isWorking = false;

  this.numLoops = 0;
  
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
      //this.ctx.context.globalAlpha = 0.5;
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(this.x + i*GEM_WIDTH, this.y + j*GEM_HEIGTH, GEM_WIDTH, GEM_HEIGTH);
    }
  }
  //this.ctx.context.globalAlpha = 1.0
  this.ctx.lineWidth = 10;
  this.ctx.strokeStyle = "rgba(255, 255, 255, 1.0)";
  this.ctx.strokeRect(this.x, this.y, NUM_COLUMNS_GRID*GEM_WIDTH, NUM_ROWS_GRID*GEM_HEIGTH);
}

Grid.prototype.isCollisionRight = function(piece) {
  
  return ((piece.x + GEM_WIDTH === this.x + this.w) ||
         (this.matrix[(piece.x + GEM_WIDTH)/GEM_WIDTH][Math.floor((piece.y + (PIECE_SIZE*GEM_HEIGTH))/GEM_HEIGTH)] !== 0))
}

Grid.prototype.isCollisionLeft = function(piece) {

return ((piece.x === this.x) ||
       (this.matrix[(piece.x - GEM_WIDTH)/GEM_WIDTH][Math.floor((piece.y + (PIECE_SIZE*GEM_HEIGTH))/GEM_HEIGTH)] !== 0)) 

}

Grid.prototype.isCollisionDown = function(piece) {

  return (this.matrix[piece.x/GEM_WIDTH][Math.floor((piece.y + piece.h)/GEM_HEIGTH)] !== 0);
}

Grid.prototype.mergePiece = function(piece) {

  for (var i = 0; i < PIECE_SIZE; i++) {
    this.matrix[piece.x/GEM_WIDTH][(piece.y + i*GEM_HEIGTH)/GEM_HEIGTH] = piece.matrix[i];
  }
}

Grid.prototype.handleMatches = function(piece) {

  this.isWorking = true;

  if (piece) {
    if (piece.isSpecial) {
      piece.isSpecial = false;  //////////////////////////
      this.hasMatches = true;
      console.log("estoy en peiza especial: posicion de la de abajo: "+ piece.x/GEM_WIDTH, (piece.y + piece.h)/GEM_HEIGTH);
      this.removeColor(this.matrix[piece.x/GEM_WIDTH][(piece.y + piece.h)/GEM_HEIGTH].name);
    } else {
      for (var i = 0; i < PIECE_SIZE; i++) {
        console.log("estoy en la gema " + i);
        this.checkAllDirections(piece.x, piece.y + (GEM_HEIGTH * i));
      }
    }
  } else {
    for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
      for (var j = 0; j < NUM_ROWS_GRID; j++) {
        if (this.matrix[i][j] !== 0) {
          this.checkAllDirections(i * GEM_WIDTH, j * GEM_HEIGTH);
        }
      }
    }
  }
  this.removeChecks();
  
  if (this.hasMatches) {
    this.hasMatches = false;
    
    setTimeout(function() {
      this.score.totalPoints += this.score.parcialPoints;
      this.score.parcialPoints = 0;
      this.removeMatches();
      this.downGems();
      this.handleMatches();
    }.bind(this),1000);
    
  } else {
    this.isWorking = false;
  }
}

Grid.prototype.checkAllDirections = function(x, y) {
  
  this.checkVertically(x, y);
  if (this.numLoops) {
    this.score.parcialPoints += 30 + (this.numLoops-1)*10; //quiero sumar 30 puntos si encadeno 3 gemas, 40 con 4, 50 con 5...
    this.numLoops = 0;
  }
  this.checkHorizontally(x, y);
  if (this.numLoops) {
    this.score.parcialPoints += 30 + (this.numLoops-1)*10; //quiero sumar 30 puntos si encadeno 3 gemas, 40 con 4, 50 con 5...
    this.numLoops = 0;
  }
  this.checkDiagonally(x, y, 1);
  if (this.numLoops) {
    this.score.parcialPoints += 30 + (this.numLoops-1)*10; //quiero sumar 30 puntos si encadeno 3 gemas, 40 con 4, 50 con 5...
    this.numLoops = 0;
  }
  this.checkDiagonally(x, y, -1);
  if (this.numLoops) {
    this.score.parcialPoints += 30 + (this.numLoops-1)*10; //quiero sumar 30 puntos si encadeno 3 gemas, 40 con 4, 50 con 5...
    this.numLoops = 0;
  }
}

Grid.prototype.isInGrid = function(x, y) {
  return ((x < this.w) && (x >= this.x) &&
          (y < this.h) && (y >= this.y));
}

Grid.prototype.checkVertically = function (x, y) {


  if (!this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical) {

    this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical = true;
    
      if (this.isInGrid(x, y + GEM_HEIGTH) && this.isInGrid(x, y - GEM_HEIGTH)) {
      if ((this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[x/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].name) &&
          (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[x/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].name)) {
            
            this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].isMatched = true;
            this.matrix[x/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].isMatched = true;
            this.matrix[x/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].isMatched = true;

            this.hasMatches = true;
            console.log("la ficha de arriba y abajo son iguales a la que analizo");
            //para los puntos...
            this.numLoops++;

      }
    }  
    if ((this.isInGrid(x, y + GEM_HEIGTH)) && (this.matrix[x/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH] !== 0)){
      if (!this.matrix[x/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].checks.vertical &&
        (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[x/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].name)) {
  
        console.log("la ficha de abajo es del mismo color => vuelvo a llamar a checkVertically")
        this.checkVertically(x, y + GEM_HEIGTH);
      }
    }
  }
}

Grid.prototype.checkHorizontally = function (x, y) {

  if (!this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.horizontal) {

    this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.horizontal = true;
  
    if ( this.isInGrid(x + GEM_WIDTH, y) && this.isInGrid(x - GEM_WIDTH, y)) {
      if ((this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH].name) &&
          (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH].name)) {
            this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].isMatched = true;
            this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH].isMatched = true;
            this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH].isMatched = true;

            this.hasMatches = true;
            console.log("la ficha de arriba y abajo son iguales a la que analizo");
            //para los puntos...
            this.numLoops++;
      }
    } 

    //aquí en el horizontal si lo necesitaré
    if (this.isInGrid(x - GEM_WIDTH, y) && (this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH] !== 0)) {
      if (!this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH].checks.horizontal && 
      (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH].name)) {
        console.log("la ficha de la izquierda es del mismo color => vuelvo a llamar a HORIZONTALLY");
        this.checkHorizontally(x - GEM_WIDTH, y);
      }
    }
    if (this.isInGrid(x + GEM_WIDTH, y) && (this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH] !== 0)){
      if (!this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH].checks.horizontal &&
        (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH].name)) {
        console.log("la ficha de la derecha es del mismo color => vuelvo a llamar a HORIZONTALLY")
        this.checkHorizontally(x + GEM_WIDTH, y);
      }
    }
  }
}

Grid.prototype.checkDiagonally = function (x, y, direction) {


  if (!this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks["diagonal"+direction+1]) {

    
      this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks["diagonal"+direction+1] = true;
  
    if(this.isInGrid(x + (GEM_WIDTH*direction), y - GEM_HEIGTH) && this.isInGrid(x - (GEM_WIDTH*direction), y + GEM_HEIGTH)) {
      if ((this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x - GEM_WIDTH*direction)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].name) &&
          (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x + GEM_WIDTH*direction)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].name)) {
           
            this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].isMatched = true;
            this.matrix[(x - GEM_WIDTH*direction)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].isMatched = true;
            this.matrix[(x + GEM_WIDTH*direction)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].isMatched = true;

            this.hasMatches = true;
            console.log("la ficha diagonal izda y dcha son iguales a la que analizo");
            //para los puntos...
            this.numLoops++;
      }
    } 

    //aquí en el diagonal si lo necesitaré
    if (this.isInGrid(x - GEM_WIDTH*direction, y + GEM_HEIGTH) && (this.matrix[(x - GEM_WIDTH*direction)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH] !== 0)) {
      if (!this.matrix[(x - GEM_WIDTH*direction)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].checks["diagonal"+direction+1] && 
      (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x - GEM_WIDTH*direction)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].name)) {
        console.log("la ficha de la izquierda es del mismo color => vuelvo a llamar a DIAgonallYY");
        this.checkDiagonally(x - GEM_WIDTH*direction, y + GEM_HEIGTH, direction);
      }
    }
    if (this.isInGrid(x + GEM_WIDTH*direction, y - GEM_HEIGTH) && (this.matrix[(x + GEM_WIDTH*direction)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH] !== 0)){
      if (!this.matrix[(x + GEM_WIDTH*direction)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].checks["diagonal"+direction+1] &&
        (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x + GEM_WIDTH*direction)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].name)) {
        console.log("la ficha de la derecha es del mismo color => vuelvo a llamar a diagONALYY")
        this.checkDiagonally(x + GEM_WIDTH*direction, y - GEM_HEIGTH, direction);
      }
    }
  }
}

Grid.prototype.remarkMatches = function() {
  
  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    for (var j = 0; j < NUM_ROWS_GRID; j++) {
      if (this.matrix[i][j] !== 0) {
        if (this.matrix[i][j].isMatched) {
            this.matrix[i][j].drawMatched(i*GEM_WIDTH - ((GEM_WIDTH*1.2)-GEM_WIDTH)/2, j*GEM_HEIGTH - ((GEM_HEIGTH*1.2)-GEM_HEIGTH)/2, GEM_WIDTH*1.2, GEM_HEIGTH*1.2);
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
      }
    }
  }
}