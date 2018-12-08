function Player(canvasId, controls, x, y, team, conexionDOM, isModeTwoPlayers, name, competitionMode) {

  this.ctx = canvasId.getContext("2d");

  this.x = x || 0;
  this.y = y || 0;

  this.team = team || 0;

  this.conexionDOM = conexionDOM;
  this.isModeTwoPlayers = isModeTwoPlayers;
  this.name = name || "";
  this.competitionMode = competitionMode || "";

  // this.mirror = mirror || undefined;    intento fallido

  this.ctx.canvas.width = window.innerWidth;
  this.ctx.canvas.height = window.innerHeight;

  this.controls = controls || {};
  
  this.drawCount = 0;
  this.drawIntervalId = undefined;

  this.timeLevel = 0;
  this.timeSpecialPiece = 0;

  this.speed = SPEED_INIT;

  this.animateCount = 0;

  ///PROBANDO PARA INTENTAR USAR TECLAS SIMULTANEAS! arrggg 
  this.movements = {
    right: false,
    left: false,
    down: false,
    switchC: false,
    special: false,
    holded: false
  }

  //this.isGameOver = false;

  this.createInstances();
  this.setListeners();

  this.isFinished = false;

  this.multAux = 1; 
}




Player.prototype.createInstances = function() {
  
  this.bg = new Background(this.ctx, this.x, this.y, this.team);
  this.score = new Score(this.ctx, this.x +500+POS_X_GRID, this.y + POS_Y_GRID+350)
  this.grid = new Grid(this.ctx, this.score, this.x + POS_X_GRID, this.y + POS_Y_GRID, this.conexionDOM);
/*   this.piece = new Piece(this.ctx, this.x+ ((NUM_COLUMNS_GRID * GEM_WIDTH) / 2) + POS_X_GRID, this.y-(GEM_HEIGTH * (PIECE_SIZE)) + POS_Y_GRID);
  this.nextPiece = new Piece(this.ctx, this.x+500+POS_X_GRID, this.y+POS_Y_GRID);
  this.holdedPiece = new Piece(this.ctx, this.x+500+POS_X_GRID, 575 + POS_Y_GRID, false, true);
 */ 

 /******pruebo a poder elegir las gemas... */
this.piece = new Piece(this.ctx, this.x+ ((NUM_COLUMNS_GRID * GEM_WIDTH) / 2) + POS_X_GRID, this.y-(GEM_HEIGTH * (PIECE_SIZE)) + POS_Y_GRID, this.team);
this.nextPiece = new Piece(this.ctx, this.x+500+POS_X_GRID, this.y+POS_Y_GRID, this.team);
this.holdedPiece = new Piece(this.ctx, this.x+500+POS_X_GRID, 575 + POS_Y_GRID, this.team, false, true);
/************* */
  
  this.specialPieces = [];
}


Player.prototype.setListeners = function() {
 
  document.addEventListener("keydown", this.onKeyDown.bind(this));
  document.addEventListener("keyup", this.onKeyUp.bind(this));  //PARA PROBAR TOQUES SIMULTANEOS DE BOTONES!!
}


Player.prototype.start = function() {

  console.log("comienza el juego!");
  this.grid.reset();
  
  this.piece.getPiece();
  this.nextPiece.matrix = this.piece.matrix.slice();
  for (var i = 0; i < NUM_INIT_SPECIAL_PIECES; i++) {
    //this.specialPieces.push(new Piece(this.ctx, this.x+545+POS_X_GRID, 840+POS_Y_GRID, true));
    this.specialPieces.push(new Piece(this.ctx, this.x+545+POS_X_GRID, 840+POS_Y_GRID, this.team, true));
  }
  this.specialPieces[0].getPiece();
  
  this.drawIntervalId = setInterval(function() {
    
    this.drawCount++;
    this.timeLevel++;
    this.timeSpecialPiece++;

    if ((this.piece.y >= this.grid.y) && (this.nextPiece.isEnabled)){
     
      this.nextPiece.getPiece();
      this.nextPiece.isEnabled = false;
    }

    /* if ((this.isGameOver()) && (!this.grid.isWorking)) {
      this.stop();
      return;
    }  */

    if (this.isGameOver()) {
      this.conexionDOM.$soundEvents[0].src = "./assets/sound/game-over.m4a"; //ESTO AQUÏ NO ESTA FUNCIONANDO DEL TODO...(el sonido digo)
      this.stop();
      //if ((this.isModeTwoPlayers) && (this.competitionMode.isCompetitionFinished)) {
        
      //}
    }// else {)
  
    /* if (this.grid.isGameOver) {
      this.stop();
    } else { //puse este else por si solucionaba el error del "game over", pero no vale para nada (hay que darle una vuelta a esto)
 */
      this.clearAll();
      
      if ((this.grid.isCollisionDown(this.piece)) && (!this.grid.isWorking)) {
        //if (this.grid.isCollisionDown(this.piece)) { //*/  //COMENTO PARA VER SI PUEDO HACER BIEN EL GAME OVER
        this.conexionDOM.$soundEvents[0].src = "./assets/sound/collision-down.m4a";
        this.piece.place();
        this.grid.mergePiece(this.piece);
        this.grid.handleMatches(this.piece);
        
        this.piece.reset(this.nextPiece, this.x, this.y);
        this.nextPiece.isSpecial = false;
      }
      this.animate();
      this.drawAll();
  
      if (((this.drawCount % this.speed) === 0) && (!this.grid.isWorking)) {
        this.piece.y += 10;
        this.drawCount = 0;
      }

      if (((this.timeLevel % LEVEL_INTERVAL) === 0) && (this.speed > SPEED_MIN)) {
        
        this.handleChangeLevel();

        if (!this.competitionMode.isCompetitionFinished) {
          this.handleCompetitionMode();
        }
      }
      if ((this.timeSpecialPiece % 4000) === 0) {
        //this.specialPieces.push(new Piece(this.ctx, this.x+500+POS_X_GRID, this.ctx.canvas.height-250+this.y+POS_Y_GRID, true));
          this.specialPieces.push(new Piece(this.ctx, this.x+545+POS_X_GRID, 840+POS_Y_GRID, true));
          this.timeSpecialPiece = 0;
      }

      
    //}
  }.bind(this), DRAW_INTERVAL_MS);
}

Player.prototype.handleChangeLevel = function() {

  this.timeLevel = 0;
  if (this.speed < SPEED_FAST_MODE) {
    this.speed--;
  } else {
    this.speed -= SPEED_GAP;
  }
  this.score.level++;
  console.log("cambio la velocidad a " + this.speed);
}


Player.prototype.handleCompetitionMode = function() {
   
  if (this.team === 0) {
    this.competitionMode.setPoints1(this.score.totalPoints);
  } else {
    this.competitionMode.setPoints2(this.score.totalPoints);
  }
  this.checkPenalties();
  this.grid.handleMatches();

  /* if (this.score.totalPoints > (50 * this.multAux)) {
     
    this.checkPenalties();
    this.multAux++;        
    //if (this.conexionDOM.$points1
  } */
}


Player.prototype.checkPenalties = function() {

  if ((this.team === 0) && (this.competitionMode.pointsPlayer1 < this.competitionMode.pointsPlayer2)) {
    console.log("es penalty contra player 1");
    this.penalty();
  } 
  
  if ((this.team != 0) && (this.competitionMode.pointsPlayer2 < this.competitionMode.pointsPlayer1)) {
    console.log("es penalty contra player 2");
    this.penalty();
  }
}


Player.prototype.penalty = function() {

  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    
    var gem = new Gem(this.ctx, this.x + POS_X_GRID + (i * GEM_WIDTH), this.y + POS_Y_GRID + (NUM_ROWS_GRID * GEM_HEIGTH))
    gem.configColor();
    gem.isSpecial = false;

    this.grid.matrix[i].push(gem);
    this.grid.matrix[i].shift();
  }
}


Player.prototype.stop = function() {
  
 /*  clearInterval(this.drawIntervalId);
  $("#points").text(Math.floor(this.score.totalPoints));
  //$("#team").text(this.rival);
  $("#game-over").toggle();
  //alert("game over!"); */

  

 
  // this.conexionDOM.$name.val(this.name)
  // this.conexionDOM.$points.text(Math.floor(this.score.totalPoints));
  //$("#team").text(this.rival);

  if (this.isModeTwoPlayers) {
    if (this.team === 0) {
      this.conexionDOM.$points1.text(Math.floor(this.score.totalPoints));
      this.conexionDOM.$gameOver1.show();
    } else {
      this.conexionDOM.$points2.text(Math.floor(this.score.totalPoints));
      this.conexionDOM.$gameOver2.show();
    }
    if (this.competitionMode.isCompetitionFinished) {
      this.conexionDOM.$soundBg[0].src = "./assets/sound/columns-atropos.m4a";
    }

  } else {
    this.conexionDOM.$soundBg[0].src = "./assets/sound/columns-atropos.m4a";
    this.conexionDOM.$name.val(this.name)
    this.conexionDOM.$points.text(Math.floor(this.score.totalPoints));
    this.conexionDOM.$gameOver.show();
  }

  clearInterval(this.drawIntervalId);
  this.isFinished = true;
  this.competitionMode.isCompetitionFinished = true;
  //alert("game over!"); 
}

Player.prototype.drawAll = function() {
  this.bg.draw();
  this.grid.draw();
  this.piece.draw();
  this.nextPiece.draw();
  this.holdedPiece.draw();
  this.specialPieces[0].drawSpecial(this.specialPieces.length - 1);

  this.grid.remarkMatches();
  this.score.draw();

}

Player.prototype.clearAll = function() {
 
  this.ctx.clearRect(this.x, this.y, this.w, this.h);
}

Player.prototype.onKeyDown = function(e) {
  
  switch (e.keyCode) {
    case this.controls.right:
      this.movements.right = true;
      break;

    case this.controls.left:
      this.movements.left = true;   
      break;

    case this.controls.down:
      this.movements.down = true;  
      break;

    case this.controls.switchC:
      this.movements.switchC = true;
      this.piece.switchColors();
      this.conexionDOM.$soundEvents[0].src = "./assets/sound/switch.m4a";

      break;

    case this.controls.specialKey:
      this.movements.special = true;
      break;

    case this.controls.holdedKey:
      this.movements.holded = true;
      break;
  }
}

Player.prototype.animate = function() {
  
  if (this.movements.right) {
    if ((!this.grid.isCollisionRight(this.piece)) && (this.animateCount % 7 === 0)) {
        this.piece.x += GEM_WIDTH;
    } 
  } 

  if (this.movements.left) {
    if ((!this.grid.isCollisionLeft(this.piece)) && (this.animateCount % 7 === 0)) {
        this.piece.x += -GEM_WIDTH;
    } 
  }

  if (this.movements.down) {
    if ((!this.grid.isWorking) && (this.animateCount % 3 === 0)) {
        this.piece.y += GEM_HEIGTH / 2;
        this.score.totalPoints += 0.25;
    }
  } 

  if (this.movements.switchC) {
      this.piece.switchColors();
      this.movements.switchC = false;
  } 

  if (this.movements.special) {
    if (this.specialPieces.length > 1) {  
        this.nextPiece.takeOutSpecial(this.specialPieces[0]);  //voy a intentar combinar estas dos lineas en una sola...NO ME HA VALIDO DE MOMENTO
        this.specialPieces.pop();
        this.movements.special = false;
    }
  }

  if (this.movements.holded) {
      this.handleHoldedPiece();
      this.movements.holded = false;
  }

  this.animateCount++;

  if (this.animateCount % MAX_ANIMATE_COUNT) {
    animateCount = 0;
  }
}

Player.prototype.onKeyUp = function(e) {
 
  switch (e.keyCode) {
    case this.controls.right:
      this.movements.right = false;
      break;

    case this.controls.left:
      this.movements.left = false;   
      break;

    case this.controls.down:
      this.movements.down = false;  
      break;
  }
}

Player.prototype.isGameOver = function() {
  
  // return this.grid.matrix[0].some(function(e) {
  //         return !(e instanceof Gem);        
  // })
  for(var i=0; i < NUM_COLUMNS_GRID; i++) {
    if (this.grid.matrix[i][-1] instanceof Gem) {
      return true;
    }
  }
  return false;

  
  //return (this.grid.matrix[Math.floor(NUM_COLUMNS_GRID / 2)][0] !== 0); //ESTE GAME OVER ESTA MAL FIJO

  //return this.piece.y < this.grid.y;

  //return (this.grid.isCollisionDown(this.piece) && (this.piece.y + this.piece.h <= this.grid.y)); //TAMPOCO ES BUENO; HAY QE DARLE UNA VUELT
}

Player.prototype.handleHoldedPiece = function() {
  
  if (!this.piece.isSpecial) {
    
    if (!this.holdedPiece.matrix.length) { //si es la rimera ver que nos metemos...
      this.holdedPiece.matrix = this.piece.matrix.slice();
      this.piece.matrix = this.nextPiece.matrix.slice();
      this.nextPiece.getPiece();
    } else { // si ya había una pieza "holded"
      var auxMatrix = this.piece.matrix.slice();
      this.piece.matrix = this.holdedPiece.matrix.slice();
      this.holdedPiece.matrix = auxMatrix.slice();
    }
  }
}