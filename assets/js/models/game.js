function Player(canvasId, controls, x, y) {

  this.ctx = canvasId.getContext("2d");
  this.ctx.scale(-1,1)

  this.x = x || 0;
  this.y = y || 0;

  this.ctx.canvas.width = window.innerWidth;
  this.ctx.canvas.height = window.innerHeight;

  this.controls = controls || {};

/*   this.controls = {
    right: right || KEY_RIGHT,
    left: left || KEY_LEFT,
    down: down || KEY_DOWN,
    switchC: switchC || KEY_SPACE,
    specialKey: specialKey || KEY_ALT_GRAPH,
    holdedKey: holdedKey|| KEY_CONTROL,
  }
 */
  this.bg = new Background(this.ctx, this.x, this.y);

  this.score = new Score(this.ctx, this.x + POS_X_SCORE, this.y + POS_Y_SCORE)
  this.grid = new Grid(this.ctx, this.score, this.x + POS_X_GRID, this.y + POS_Y_GRID);
  this.piece = new Piece(this.ctx, this.x+ ((NUM_COLUMNS_GRID * GEM_WIDTH) / 2) + POS_X_GRID, this.y-(GEM_HEIGTH * (PIECE_SIZE)) + POS_Y_GRID);
  this.nextPiece = new Piece(this.ctx, this.x+500+POS_X_GRID, this.y+1+POS_Y_GRID);

  this.specialPieces = [];
  this.holdedPiece = new Piece(this.ctx, this.x+600+POS_X_GRID, this.ctx.canvas.height-250 + POS_Y_GRID, false, true);
  
  this.drawCount = 0;
  this.drawIntervalId = undefined;

  this.time = 0;
  this.speed = 30;

  this.setListeners();
}

Player.prototype.start = function() {
  this.grid.reset();
  
  this.piece.getPiece();
  this.nextPiece.matrix = this.piece.matrix.slice();
  for (var i = 0; i < NUM_INIT_SPECIAL_PIECES; i++) {
    this.specialPieces.push(new Piece(this.ctx, 500+POS_X_GRID, this.ctx.canvas.height-250+POS_Y_GRID, true));
  }
  this.specialPieces[0].getPiece();
  
  this.drawIntervalId = setInterval(function() {
    
    this.drawCount++;
    this.time++;

    if ((this.piece.y >= this.grid.y) && (this.nextPiece.isEnabled)){
     
      this.nextPiece.getPiece();
      this.nextPiece.isEnabled = false;
      //this.nextPiece.isSpecial = false; //////////////////
    }
  
    if (this.isGameOver()) {
      this.stop();
    } else { //puse este else por si solucionaba el error del "game over", pero no vale para nada (hay que darle una vuelta a esto)

      this.clearAll();
      
       if (this.grid.isCollisionDown(this.piece)) {

        this.piece.place();
        this.grid.mergePiece(this.piece);
        this.grid.handleMatches(this.piece);
        this.piece.reset(this.nextPiece, this.x, this.y);
        this.nextPiece.isSpecial = false;
      }
  
      this.drawAll();
  
      if (((this.drawCount % this.speed) === 0) && (!this.grid.isWorking)) {
        this.piece.y += 10;
        this.drawCount = 0;
      }

      if (((this.time % 1000) === 0) && (this.speed > 4)) {
        this.time = 0;
        this.speed -= 2;
        console.log("cambio la velocidad a " + this.speed);
      }
      // if ((this.time % 15000) === 0) {
      //   this.specialPieces.push(new Piece(this.ctx, 500, this.ctx.canvas.height-250, true));
      // }
    }
  }.bind(this), DRAW_INTERVAL_MS);
}

Player.prototype.stop = function() {
  
  clearInterval(this.drawIntervalId);
  alert("game over!");
}

Player.prototype.drawAll = function() {
  this.bg.draw();
  this.grid.draw();
  this.piece.draw();
  this.nextPiece.draw();
  this.holdedPiece.draw();
  this.specialPieces[0].drawSpecial(this.specialPieces.length - 1, this.x, this.y);
  this.grid.remarkMatches();
  this.score.draw();

}

Player.prototype.clearAll = function() {
 
  this.ctx.clearRect(this.x, this.y, this.w, this.h);
}

//PARA INTENTAR LO DE LOS 2 PLAYERSSS (MODO DESESPERACION)
/* Player.prototype.setListeners = function() {
 
  document.onkeydown = this.onKeyDown.bind(this);
} */

Player.prototype.setListeners = function() {
 
  document.addEventListener("keydown", this.onKeyDown.bind(this));
}

Player.prototype.onKeyDown = function(e) {
  

  ///PORBANDO PARA PONER 2 PLAYERSS
  /* switch (e.keyCode) {
    case KEY_RIGHT:
      if (!this.grid.isCollisionRight(this.piece)) {
        this.piece.x += GEM_WIDTH
      }
      break;
    case KEY_LEFT:
      if (!this.grid.isCollisionLeft(this.piece)) {
        this.piece.x += -GEM_WIDTH;
      }
      break;
    case KEY_DOWN:
      if (!this.grid.isWorking) {
        this.piece.y += GEM_HEIGTH / 2;
        this.score.totalPoints += 0.25;
      }
      break;
    case KEY_SPACE:
      this.piece.switchColors();
      break;
    case KEY_ALT_GRAPH:
      if (this.specialPieces.length > 1) {
        this.nextPiece.takeOutSpecial(this.specialPieces[0]);
        this.specialPieces.pop();
      }
      break;
    case KEY_CONTROL:
      this.handleHoldedPiece();
      break;
  } */

  switch (e.keyCode) {
    case this.controls.right:
      if (!this.grid.isCollisionRight(this.piece)) {
        this.piece.x += GEM_WIDTH
      }
      break;
    case this.controls.left:
      if (!this.grid.isCollisionLeft(this.piece)) {
        this.piece.x += -GEM_WIDTH;
      }
      break;
    case this.controls.down:
      if (!this.grid.isWorking) {
        this.piece.y += GEM_HEIGTH / 2;
        this.score.totalPoints += 0.25;
      }
      break;
    case this.controls.switchC:
      this.piece.switchColors();
      break;
    case this.controls.specialKey:
      if (this.specialPieces.length > 1) {
        this.nextPiece.takeOutSpecial(this.specialPieces[0]);
        this.specialPieces.pop();
      }
      break;
    case this.controls.holdedKey:
      this.handleHoldedPiece();
      break;
  }

}

Player.prototype.isGameOver = function() {
  
  return (this.grid.matrix[Math.floor(NUM_COLUMNS_GRID / 2)][0] !== 0);
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