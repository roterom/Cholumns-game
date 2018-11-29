function Grid(ctx,score) {
  this.ctx = ctx;
  this.score = score;

  this.x = 0;
  this.y = 0;
  
  this.w = GEM_WIDTH * NUM_COLUMNS_GRID;
  this.h = GEM_HEIGTH * NUM_ROWS_GRID;

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

  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    for (var j = 0; j < NUM_ROWS_GRID; j++) {
      if (this.matrix[i][j] !== 0) {
        this.ctx.fillStyle = this.matrix[i][j].name;
        this.ctx.fillRect(this.x + i*50, this.y + j*50, 50, 50);
      }
      this.ctx.strokeStyle = "#000";
      this.ctx.strokeRect(this.x + i*50, this.y + j*50, 50, 50);
    }
  }
}

Grid.prototype.mergePiece = function(piece) {

  for (var i = 0; i < PIECE_SIZE; i++) {
    this.matrix[piece.x/GEM_WIDTH][(piece.y + i*GEM_HEIGTH)/GEM_HEIGTH] = piece.matrix[i];
  }
}

Grid.prototype.handleMatches = function(piece) {

  this.isWorking = true;

  if (piece) {
    for (var i = 0; i < PIECE_SIZE; i++) {
      console.log("estoy en la gema " + i);
      this.checkAllDirections(piece.x, piece.y + (GEM_HEIGTH * i));
      /* this.checkVertically(piece.x, piece.y + (GEM_HEIGTH * i));
      this.checkHorizontally(piece.x, piece.y + (GEM_HEIGTH * i));
      this.checkDiagonally1(piece.x, piece.y + (GEM_HEIGTH * i));
      this.checkDiagonally2(piece.x, piece.y + (GEM_HEIGTH * i)); */
    }
  } else {
    for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
      for (var j = 0; j < NUM_ROWS_GRID; j++) {
        if (this.matrix[i][j] !== 0) {
          this.checkAllDirections(i * GEM_WIDTH, j * GEM_HEIGTH);
          /* this.checkVertically(i * GEM_WIDTH, j * GEM_HEIGTH);
          this.checkHorizontally(i * GEM_WIDTH, j * GEM_HEIGTH);
          this.checkDiagonally1(i * GEM_WIDTH, j * GEM_HEIGTH);
          this.checkDiagonally2(i * GEM_WIDTH, j * GEM_HEIGTH); */
        }
      }
    }
  }
  this.removeChecks();
  
  if (this.hasMatches) {
    this.hasMatches = false;
    //totalPoints += points;
    //points = 0;
    //this.remarkMatches();
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
  this.checkDiagonally1(x, y);
  if (this.numLoops) {
    this.score.parcialPoints += 30 + (this.numLoops-1)*10; //quiero sumar 30 puntos si encadeno 3 gemas, 40 con 4, 50 con 5...
    this.numLoops = 0;
  }
  this.checkDiagonally2(x, y);
  if (this.numLoops) {
    this.score.parcialPoints += 30 + (this.numLoops-1)*10; //quiero sumar 30 puntos si encadeno 3 gemas, 40 con 4, 50 con 5...
    this.numLoops = 0;
  }
}

// Grid.prototype.areMatches = function() {
//   for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
//     for (var j = 0; j < NUM_ROWS_GRID; j++) {
//       if ((this.matrix[i][j] !== 0) && (this.matrix[i][j].isMatched)) {
//         return true;
//       }
//     }
//   }
//   return false;
// }


Grid.prototype.checkVertically = function (x, y) {

  //this.numLoops = 0; //para luego los puntos..

  if (!this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical) {

    this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.vertical = true;
  
    if (((y + GEM_HEIGTH) < this.h) && ((y - GEM_HEIGTH) >= this.y)) {
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

  //his.numLoops = 0; //para luego los puntos..

  if (!this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.horizontal) {

    this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.horizontal = true;
  
    if (((x + GEM_WIDTH) < this.w) && ((x - GEM_WIDTH) >= this.x)) {
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
  // points += 30 + (this.numLoops-1)*10; //quiero sumar 30 puntos si encadeno 3 gemas, 40 con 4, 50 con 5...
  // this.numLoops = 0;
}

Grid.prototype.checkDiagonally1 = function (x, y) {

  //this.numLoops = 0; //para luego los puntos..

  if (!this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.diagonal1) {

    this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.diagonal1 = true;
  
    if (((x + GEM_WIDTH) < this.w) && ((x - GEM_WIDTH) >= this.x) &&
        ((y + GEM_HEIGTH) < this.h) && ((y - GEM_HEIGTH) >= this.y)) {
      if ((this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].name) &&
          (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].name)) {
            this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].isMatched = true;
            this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].isMatched = true;
            this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].isMatched = true;

            this.hasMatches = true;
            console.log("la ficha diagonal izda y dcha son iguales a la que analizo");
            //para los puntos...
            this.numLoops++;
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
  // points += 30 + (this.numLoops-1)*10; //quiero sumar 30 puntos si encadeno 3 gemas, 40 con 4, 50 con 5...
  // this.numLoops = 0;
}

Grid.prototype.checkDiagonally2 = function (x, y) {

  //this.numLoops = 0; //para luego los puntos..

  if (!this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.diagonal2) {

    this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].checks.diagonal2 = true;
  
    if (((x + GEM_WIDTH) < this.w) && ((x - GEM_WIDTH) >= this.x) &&
        ((y + GEM_HEIGTH) < this.h) && ((y - GEM_HEIGTH) >= this.y)) {
      if ((this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].name) &&
          (this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].name === this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].name)) {
            this.matrix[x/GEM_WIDTH][y/GEM_HEIGTH].isMatched = true;
            this.matrix[(x - GEM_WIDTH)/GEM_WIDTH][(y - GEM_HEIGTH)/GEM_HEIGTH].isMatched = true;
            this.matrix[(x + GEM_WIDTH)/GEM_WIDTH][(y + GEM_HEIGTH)/GEM_HEIGTH].isMatched = true;

            this.hasMatches = true;
            console.log("la ficha diagonal izda y dcha son iguales a la que analizo");
            //para los puntos...
            this.numLoops++;
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
  // points += 30 + (this.numLoops-1)*10; //quiero sumar 30 puntos si encadeno 3 gemas, 40 con 4, 50 con 5...
  // this.numLoops = 0;
}

Grid.prototype.remarkMatches = function() {
  //this.ctx.scale(1.1, 1.1)
  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    for (var j = 0; j < NUM_ROWS_GRID; j++) {
      if (this.matrix[i][j] !== 0) {
        if (this.matrix[i][j].isMatched) {
          this.ctx.fillStyle = this.matrix[i][j].name;
          this.ctx.fillRect(i*GEM_WIDTH, j*GEM_HEIGTH, GEM_WIDTH*1.1, GEM_HEIGTH*1.1);
          //this.ctx.fillRect(i*GEM_WIDTH, j*GEM_HEIGTH, 1, 1);

        // } else {

        //   for (var direction in this.matrix[i][j].checks) {
        //     this.matrix[i][j].checks[direction] = false;
        //   }
        //   /* this.matrix[i][j].checks.vertical = false;
        //   this.matrix[i][j].checks.horizontal = false;
        //   this.matrix[i][j].checks.diagonal1 = false;
        //   this.matrix[i][j].checks.diagonal2 = false; */
        }
      }
    }
  }
  //totalPoints += points;

  // this.ctx.font = 'italic 60px Calibri';
  // this.ctx.strokeStyle = "red";
  
  // this.ctx.strokeText(points, 400, 250);


  // this.ctx.font = '60px Calibri';
  // this.ctx.fillStyle = "blue";
  // this.ctx.fillText("Total points", 400, 350);
  // this.ctx.font = '100px Calibri';
  // this.ctx.fillText(points, 400, 450);

}

Grid.prototype.removeMatches = function() {
  
  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    for (var j = 0; j < NUM_ROWS_GRID; j++) {
      if (this.matrix[i][j] !== 0) {
        if (this.matrix[i][j].isMatched) {
          this.matrix[i][j] = 0;
        // } else {

        //   for (var direction in this.matrix[i][j].checks) {
        //     this.matrix[i][j].checks[direction] = false;
        //   }
        //   /* this.matrix[i][j].checks.vertical = false;
        //   this.matrix[i][j].checks.horizontal = false;
        //   this.matrix[i][j].checks.diagonal1 = false;
        //   this.matrix[i][j].checks.diagonal2 = false; */
        }
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