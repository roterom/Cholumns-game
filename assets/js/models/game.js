function Game(canvasId) {

  this.ctx = canvasId.getContext("2d");

  this.ctx.canvas.width = window.innerWidth;
  this.ctx.canvas.height = window.innerHeight;

  this.bg = new Background(this.ctx);

  this.score = new Score(this.ctx)
  this.grid = new Grid(this.ctx, this.score);
  this.piece = new Piece(this.ctx);
  this.nextPiece = new Piece(this.ctx, 500, 1);

  this.choloPiece = new Piece(this.ctx, 500, this.ctx.canvas.height-250, true);
  this.holdedPiece = new Piece(this.ctx, 600, this.ctx.canvas.height-250, false, true);
  
  this.drawCount = 0;
  this.drawIntervalId = undefined;

  this.time = 0;
  this.speed = 30;

  this.setListeners();
}

Game.prototype.start = function() {
  this.grid.reset();
  
  this.piece.getPiece();
  this.nextPiece.getPiece();
  this.choloPiece.getPiece();
  
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
        this.piece.reset(this.nextPiece);
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
        console.log("cambio la velocidad a " + this.speed)
      }
  }

  }.bind(this), DRAW_INTERVAL_MS);
}

Game.prototype.stop = function() {
  clearInterval(this.drawIntervalId);
  alert("game over!");
}

Game.prototype.drawAll = function() {
  this.bg.draw();
  this.grid.draw();
  this.piece.draw();
  this.nextPiece.draw();
  this.holdedPiece.draw();
  this.choloPiece.draw();
  this.grid.remarkMatches();
  this.score.draw();
}

Game.prototype.clearAll = function() {
  this.ctx.clearRect(0, 0, this.w, this.h);
}

Game.prototype.setListeners = function() {
  document.onkeydown = this.onKeyDown.bind(this);
}

Game.prototype.onKeyDown = function(e) {
  switch (e.keyCode) {
    case KEY_RIGHT:
      if (!this.grid.isCollisionRight(this.piece)) {
        this.piece.x += GEM_WIDTH;
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
      this.nextPiece.takeOutCholo(this.choloPiece);
      break;
    case KEY_CONTROL:
      if (!this.holdedPiece.matrix.length) {
        this.holdedPiece.matrix = this.piece.matrix;
        this.piece.matrix = this.nextPiece.matrix;
        this.nextPiece.getPiece();
       // this.piece.reset(this.nextPiece);
      } else {
        var auxMatrix = this.piece.matrix;
        this.piece.takeOutHolded(this.holdedPiece);
        this.holdedPiece.matrix = auxMatrix;
        if (this.piece.y < this.grid.y) {
          this.nextPiece.matrix = this.auxMatrix;
        }
      }
      break;
  }
}

Game.prototype.isGameOver = function() {
  
  return (this.grid.matrix[Math.floor(NUM_COLUMNS_GRID / 2)][0] !== 0);
}
