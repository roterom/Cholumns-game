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
    console.log("estoy en la gema " + i);
    this.checkVertically(piece.x, piece.y + (GEM_HEIGTH * i));
    this.checkHorizontally(piece.x, piece.y + (GEM_HEIGTH * i));
    this.checkDiagonally1(piece.x, piece.y + (GEM_HEIGTH * i));
    this.checkDiagonally2(piece.x, piece.y + (GEM_HEIGTH * i));
  }
}


Grid.prototype.checkVertically = function (x, y) {

  if (!this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical) {

    this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical = true;
  
    if (((y + GEM_HEIGTH) < this.h) && ((y - GEM_HEIGTH) >= this.y)) {
      if ((this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[x/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].name) &&
          (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[x/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].name)) {
            this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].hasMatched = true;
            this.matrix[x/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].hasMatched = true;
            this.matrix[x/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].hasMatched = true;
            console.log("la ficha de arriba y abajo son iguales a la que analizo");
      }
    } 

    // //creo que esto no me va a hacer falta => sobra
    // if (((y - GEM_HEIGTH) >= this.y) && (this.matrix[x/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH] !== 0)) {
    //   if ((this.matrix[x/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].checks.vertical === false) && 
    //   (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[x/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].name)) {
    //     //this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical = true;
    //     console.log("aquí realmente creo que no debería entrar nunca");
    //     this.checkVertically(x, y - GEM_HEIGTH);
    //   }

    if (((y + GEM_HEIGTH) < this.h) && (this.matrix[x/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH] !== 0)){
      if ((this.matrix[x/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].checks.vertical === false) &&
        (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[x/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].name)) {
        //this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical = true;
        console.log("la ficha de abajo es del mismo color => vuelvo a llamar a checkVertically")
        this.checkVertically(x, y + GEM_HEIGTH);
      }
    }
  }
}

Grid.prototype.checkHorizontally = function (x, y) {

  if (!this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.horizontal) {

    this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.horizontal = true;
  
    if (((x + GEM_WIDTH) < this.w) && ((x - GEM_WIDTH) >= this.x)) {
      if ((this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH].name) &&
          (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH].name)) {
            this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].hasMatched = true;
            this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH].hasMatched = true;
            this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH].hasMatched = true;
            console.log("la ficha de arriba y abajo son iguales a la que analizo");
      }
    } 

    //aquí en el horizontal si lo necesitaré
    if (((x - GEM_WIDTH) >= this.x) && (this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH] !== 0)) {
      if ((this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH].checks.horizontal === false) && 
      (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH].name)) {
        //this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical = true;
        console.log("la ficha de la izquierda es del mismo color => vuelvo a llamar a HORIZONTALLY");
        this.checkHorizontally(x - GEM_WIDTH, y);
      }
    }

    if (((x + GEM_WIDTH) < this.w) && (this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH] !== 0)){
      if ((this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH].checks.horizontal === false) &&
        (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][y/GEM_HEIGTH].name)) {
        //this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical = true;
        console.log("la ficha de la derecha es del mismo color => vuelvo a llamar a HORIZONTALLY")
        this.checkHorizontally(x + GEM_WIDTH, y);
      }
    }
  }
}

Grid.prototype.checkDiagonally1 = function (x, y) {

  if (!this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.diagonal1) {

    this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.diagonal1 = true;
  
    if (((x + GEM_WIDTH) < this.w) && ((x - GEM_WIDTH) >= this.x) &&
        ((y + GEM_HEIGTH) < this.h) && ((y - GEM_HEIGTH) >= this.y)) {
      if ((this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].name) &&
          (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].name)) {
            this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].hasMatched = true;
            this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].hasMatched = true;
            this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].hasMatched = true;
            console.log("la ficha diagonal izda y dcha son iguales a la que analizo");
      }
    } 

    //aquí en el diagonal si lo necesitaré
    if (((x - GEM_WIDTH) >= this.x) && ((y + GEM_HEIGTH) < this.h)  && (this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH] !== 0)) {
      if ((this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].checks.diagonal1 === false) && 
      (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].name)) {
        //this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical = true;
        console.log("la ficha de la izquierda es del mismo color => vuelvo a llamar a DIAgonallYY");
        this.checkDiagonally1(x - GEM_WIDTH, y + GEM_HEIGTH);
      }
    }

    if (((x + GEM_WIDTH) < this.w) && ((y - GEM_HEIGTH) >= this.y) && (this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH] !== 0)){
      if ((this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].checks.diagonal1 === false) &&
        (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].name)) {
        //this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical = true;
        console.log("la ficha de la derecha es del mismo color => vuelvo a llamar a diagONALYY")
        this.checkDiagonally1(x + GEM_WIDTH, y - GEM_HEIGTH);
      }
    }
  }
}

Grid.prototype.checkDiagonally2 = function (x, y) {

  if (!this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.diagonal2) {

    this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.diagonal2 = true;
  
    if (((x + GEM_WIDTH) < this.w) && ((x - GEM_WIDTH) >= this.x) &&
        ((y + GEM_HEIGTH) < this.h) && ((y - GEM_HEIGTH) >= this.y)) {
      if ((this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].name) &&
          (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].name)) {
            this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].hasMatched = true;
            this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].hasMatched = true;
            this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].hasMatched = true;
            console.log("la ficha diagonal izda y dcha son iguales a la que analizo");
      }
    } 

    //aquí en el diagonal si lo necesitaré
    if (((x - GEM_WIDTH) >= this.x) && ((y - GEM_HEIGTH) >= this.y)  && (this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH] !== 0)) {
      if ((this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].checks.diagonal2 === false) && 
      (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].name)) {
        //this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical = true;
        console.log("la ficha de la izquierda es del mismo color => vuelvo a llamar a diaGONALLYY");
        this.checkDiagonally2(x - GEM_WIDTH, y - GEM_HEIGTH);
      }
    }

    if (((x + GEM_WIDTH) < this.w) && ((y + GEM_HEIGTH) < this.h) && (this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH] !== 0)){
      if ((this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].checks.diagonal2 === false) &&
        (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].name)) {
        //this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical = true;
        console.log("la ficha de la derecha es del mismo color => vuelvo a llamar a DIAGOOOnaLLYY")
        this.checkDiagonally2(x + GEM_WIDTH, y + GEM_HEIGTH);
      }
    }
  }
}

Grid.prototype.removeMatches = function() {
  
  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    for (var j = 0; j < NUM_ROWS_GRID; j++) {
      if (this.matrix[i][j] !== 0) {
        if (this.matrix[i][j].hasMatched) {
          this.matrix[i][j] = 0;
        } else {

          for (var direction in this.matrix[i][j].checks) {
            this.matrix[i][j].checks[direction] = false;
          }
          // this.matrix[i][j].checks.vertical = false;
          // this.matrix[i][j].checks.horizontal = false;
          // this.matrix[i][j].checks.diagonal1 = false;
          // this.matrix[i][j].checks.diagonal2 = false;
        }
      }
    }
  }
}

// Grid.prototype.removeChecks = function(direction) {

//   for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
//     for (var j = 0; j < NUM_ROWS_GRID; j++) {
//       if (this.matrix[i][j] !== 0) {
//         this.matrix[i][j].checks[direction] = false;
//       }
//     }
//   }

// }

Grid.prototype.downGems = function() {

  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    // for (var j = 0; j < NUM_ROWS_GRID; j++) {  // recorremos de abajo a arriba!!
    //   if (this.matrix[i][j] === 0) {
    //     this.matrix[i][j] = this.matrix[i][j-1];
    //   }
    // }
    // var auxArr = [];
    // auxArr = this.matrix[i].filter(function(gem) {
    //   return gem !== 0; 
    // });

     for (var j = 0; j < NUM_ROWS_GRID; j++) {
        if (this.matrix[i][j] == 0) {
          this.matrix[i].splice(j,1);
          this.matrix[i].unshift(0);
        }
    }
    //   auxArr.unshift(0);
    // }
    // this.matrix[i] = [];
    // this.matrix.push(auxArr);
  }
}