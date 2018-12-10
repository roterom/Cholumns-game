function Grid(ctx,score, x, y, conexionDOM) {
  this.ctx = ctx;
  this.score = score;

  this.w = GEM_WIDTH * NUM_COLUMNS_GRID;
  this.h = GEM_HEIGTH * NUM_ROWS_GRID;

  this.x = x || 0;
  this.y = y || 0;

  this.conexionDOM = conexionDOM;
  
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
  
  //COMENTADO PARA INTENTAR LOS DOS PLAYERSS
  /* return ((piece.x + GEM_WIDTH === this.x + this.w) ||
         (this.matrix[(piece.x + GEM_WIDTH)/GEM_WIDTH][Math.floor((piece.y + (PIECE_SIZE*GEM_HEIGTH))/GEM_HEIGTH)] !== 0))   */


//VOY ACOMENTAR TAMBIEN LOS SIGUIENTE PARA PROBAR SI DESPUES DE LA PARADHIÑA PUEDO MOVER LATERALMENTE (QUE AHORA CON ESA PARADHIÑA NO PUEDO DE MOEMNTO)
  // return ((piece.x + GEM_WIDTH === this.x + this.w) ||
  //        (this.matrix[((piece.x + GEM_WIDTH) - this.x)/GEM_WIDTH][Math.floor(((piece.y + (PIECE_SIZE*GEM_HEIGTH)) - this.y)/GEM_HEIGTH)] !== 0))  
  /******HASTA AQUIIIIIIIIIIII */       
 

  //probatura para la paradiña...
  if (this.isCollisionDown(piece)) {
  return ((piece.x + GEM_WIDTH === this.x + this.w) ||
         (this.matrix[((piece.x + GEM_WIDTH) - this.x)/GEM_WIDTH][Math.floor(((piece.y + ((PIECE_SIZE-1)*GEM_HEIGTH)) - this.y)/GEM_HEIGTH)] !== 0))
  } else {
    return ((piece.x + GEM_WIDTH === this.x + this.w) ||
         (this.matrix[((piece.x + GEM_WIDTH) - this.x)/GEM_WIDTH][Math.floor(((piece.y + (PIECE_SIZE*GEM_HEIGTH)) - this.y)/GEM_HEIGTH)] !== 0))
  }
         //---------hasta aquí la prueba....

}

Grid.prototype.isCollisionLeft = function(piece) {

  ///COMENTADO PARA INTENTANR  DOS PLAYERRSS....
/* return ((piece.x === this.x) ||
       (this.matrix[(piece.x - GEM_WIDTH)/GEM_WIDTH][Math.floor((piece.y + (PIECE_SIZE*GEM_HEIGTH))/GEM_HEIGTH)] !== 0))  */

//COMENTAMOS PARA LA PARADIÑAAA
// return ((piece.x === this.x) ||
//       (this.matrix[((piece.x - GEM_WIDTH) - this.x)/GEM_WIDTH][Math.floor(((piece.y + (PIECE_SIZE*GEM_HEIGTH)) - this.y)/GEM_HEIGTH)] !== 0)) 
//HASTA AQUII....

//probatura para la paradiña...
if (this.isCollisionDown(piece)) {
  return ((piece.x === this.x) ||
  (this.matrix[((piece.x - GEM_WIDTH) - this.x)/GEM_WIDTH][Math.floor(((piece.y + ((PIECE_SIZE-1)*GEM_HEIGTH)) - this.y)/GEM_HEIGTH)] !== 0));
} else {
  return ((piece.x === this.x) ||
  (this.matrix[((piece.x - GEM_WIDTH) - this.x)/GEM_WIDTH][Math.floor(((piece.y + (PIECE_SIZE*GEM_HEIGTH)) - this.y)/GEM_HEIGTH)] !== 0)) 
}
//____________---------hasta aquí la prueba

}

Grid.prototype.isCollisionDown = function(piece) {

  //INTENTANDO LOS 2 PLAYEEERRSSS
  /* return (this.matrix[Math.floor(piece.x/GEM_WIDTH)][Math.floor((piece.y + piece.h)/GEM_HEIGTH)] !== 0); */

  return (this.matrix[Math.floor((piece.x - this.x)/GEM_WIDTH)][Math.floor(((piece.y + piece.h) - this.y)/GEM_HEIGTH)] !== 0);
}

Grid.prototype.mergePiece = function(piece) {


  //INTENTANDOO HACER 2 PLAYEEERRRSSS
 /*  for (var i = 0; i < PIECE_SIZE; i++) {
    this.matrix[piece.x/GEM_WIDTH][(piece.y + i*GEM_HEIGTH)/GEM_HEIGTH] = piece.matrix[i];
  } */

 
  for (var i = 0; i < PIECE_SIZE; i++) {
    this.matrix[(piece.x - this.x)/GEM_WIDTH][((piece.y + i*GEM_HEIGTH)-this.y)/GEM_HEIGTH] = piece.matrix[i];
  }
}

//PARA PROBAR LOS 2 PLAYEERRSSSS
/* Grid.prototype.remarkMatches = function() {
  
  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    for (var j = 0; j < NUM_ROWS_GRID; j++) {
      if (this.matrix[i][j] !== 0) {
        if (this.matrix[i][j].isMatched) {
            this.matrix[i][j].drawMatched(i*GEM_WIDTH - ((GEM_WIDTH*1.2)-GEM_WIDTH)/2, j*GEM_HEIGTH - ((GEM_HEIGTH*1.2)-GEM_HEIGTH)/2, GEM_WIDTH*1.2, GEM_HEIGTH*1.2);
        }
      }
    }
  }
} */

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
    //this.score.parcialPoints += POINTS_STANDAR + ((this.numLoops-1) * POINTS_EXTRA); //quiero sumar 30 puntos si encadeno 3 gemas, 40 con 4, 50 con 5...
    this.score.parcialPoints += POINTS_STANDAR * this.numExtraMatches * this.numIterationMatches; //si encuentro 4 piezas es el doble de puntos, 5 el triple...
    this.numExtraMatches = 0;
  }
  this.checkHorizontally(i, j);
  if (this.numExtraMatches) {
    //this.score.parcialPoints += POINTS_STANDAR + ((this.numLoops-1) * POINTS_EXTRA); //quiero sumar 30 puntos si encadeno 3 gemas, 40 con 4, 50 con 5...
    this.score.parcialPoints += POINTS_STANDAR * this.numExtraMatches * this.numIterationMatches;
    this.numExtraMatches = 0;
  }
  this.checkDiagonally(i, j, 1);
  if (this.numExtraMatches) {
    //this.score.parcialPoints += POINTS_STANDAR + ((this.numLoops-1) * POINTS_EXTRA); //quiero sumar 30 puntos si encadeno 3 gemas, 40 con 4, 50 con 5...
    this.score.parcialPoints += POINTS_STANDAR * this.numExtraMatches * this.numIterationMatches;
    this.numExtraMatches = 0;
  }
  this.checkDiagonally(i, j, -1);
  if (this.numExtraMatches) {
    //this.score.parcialPoints += POINTS_STANDAR + ((this.numLoops-1) * POINTS_EXTRA); //quiero sumar 30 puntos si encadeno 3 gemas, 40 con 4, 50 con 5...
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
            console.log("la ficha de arriba y abajo son iguales a la que analizo");
            //para los puntos...
            this.numExtraMatches++;

      }
    }  
    if (this.isInGrid(i, j+1) && (this.matrix[i][j+1] !== 0)){
      if (!this.matrix[i][j+1].checks.vertical &&
        (this.matrix[i][j].name === this.matrix[i][j+1].name)) {
  
        console.log("la ficha de abajo es del mismo color => vuelvo a llamar a checkVertically")
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
            console.log("la ficha de arriba y abajo son iguales a la que analizo");
            //para llos puntos....
            this.numExtraMatches++;
      }
    } 

    //aquí en el horizontal si lo necesitaré
    if (this.isInGrid(i-1, j) && (this.matrix[i-1][j] !== 0)) {
      if (!this.matrix[i-1][j].checks.horizontal && 
      (this.matrix[i][j].name === this.matrix[i-1][j].name)) {
        console.log("la ficha de la izquierda es del mismo color => vuelvo a llamar a HORIZONTALLY");
        this.checkHorizontally(i-1, j);
      }
    }
    if (this.isInGrid(i+1, j) && (this.matrix[i+1][j] !== 0)){
      if (!this.matrix[i+1][j].checks.horizontal &&
        (this.matrix[i][j].name === this.matrix[i+1][j].name)) {
        console.log("la ficha de la derecha es del mismo color => vuelvo a llamar a HORIZONTALLY")
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
            console.log("la ficha diagonal izda y dcha son iguales a la que analizo");
            //para los puntos...
            this.numExtraMatches++;
      }
    } 

    //aquí en el diagonal si lo necesitaré
    if (this.isInGrid(i-direction, j+1) && (this.matrix[i-direction][j+1] !== 0)) {
      if (!this.matrix[i-direction][j+1].checks["diagonal"+direction+1] && 
      (this.matrix[i][j].name === this.matrix[i-direction][j+1].name)) {
        console.log("la ficha de la izquierda es del mismo color => vuelvo a llamar a DIAgonallYY");
        this.checkDiagonally(i-direction, j+1, direction);
      }
    }
    if (this.isInGrid(i+direction, j-1) && (this.matrix[i+direction][j-1] !== 0)){
      if (!this.matrix[i+direction][j-1].checks["diagonal"+direction+1] &&
        (this.matrix[i][j].name === this.matrix[i+direction][j-1].name)) {
        console.log("la ficha de la derecha es del mismo color => vuelvo a llamar a diagONALYY")
        this.checkDiagonally(i+direction, j-1, direction);
      }
    }
  }
}

//COMENTADO PARA INTENTAR LOS 2 PLAYERRSSS
/* Grid.prototype.handleMatches = function(piece) {

  this.isWorking = true;

  if (piece) {
    if (piece.isSpecial) {
      this.hasMatches = true;
      //console.log("estoy en peiza especial: posicion de la de abajo: "+ piece.x/GEM_WIDTH, (piece.y + piece.h)/GEM_HEIGTH);
      if (this.isInGrid(piece.x/GEM_WIDTH,(piece.y + piece.h)/GEM_HEIGTH)) {
        this.removeColor(this.matrix[piece.x/GEM_WIDTH][(piece.y + piece.h)/GEM_HEIGTH].name);
      }
    } else {
      for (var i = 0; i < PIECE_SIZE; i++) {
        console.log("estoy en la gema " + i);
        this.checkAllDirections(piece.x/GEM_WIDTH, (piece.y + (GEM_HEIGTH * i))/GEM_HEIGTH);
      } 
    }
  } else {
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
} */

Grid.prototype.handleMatches = function(piece) {

  this.isWorking = true;
  this.numIterationMatches++;

  if (piece) {
    if (piece.isSpecial) {
      this.hasMatches = true;
      //console.log("estoy en peiza especial: posicion de la de abajo: "+ piece.x/GEM_WIDTH, (piece.y + piece.h)/GEM_HEIGTH);
      if (this.isInGrid((piece.x - this.x)/GEM_WIDTH,(piece.y + piece.h)/GEM_HEIGTH)) {
        this.removeColor(this.matrix[(piece.x - this.x)/GEM_WIDTH][((piece.y + piece.h) - this.y)/GEM_HEIGTH].name);
      }
    } else {
      for (var i = 0; i < PIECE_SIZE; i++) {
        console.log("estoy en la gema " + i);
        this.checkAllDirections((piece.x - this.x)/GEM_WIDTH, Math.floor((piece.y + (GEM_HEIGTH * i))/GEM_HEIGTH));
      } 
    }
  } else {
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
   // this.setTimeout(function() {
      this.conexionDOM.$soundEvents[0].src = "./assets/sound/events/success.m4a";  //COMENTO ESTO PARA VER SI PUDUEDO CONSEGUIR QUE SUENE EL RUIDO DE "COLISION BAJA" CUANDO BAJO RÄPIDO... 
  //  }.bind(this), 500);
    this.hasMatches = false;
    
    setTimeout(function() {
      //this.conexionDOM.$soundEvents[0].src = "./assets/sound/success.m4a";
      this.score.totalPoints += this.score.parcialPoints;
      this.score.parcialPoints = 0;
      this.removeMatches();
      this.downGems();
      this.handleMatches();
    }.bind(this),1000);
    
  } else {
    this.isWorking = false;
    this.numIterationMatches = 0;
  }
}