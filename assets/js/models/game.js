function Game(canvasId) {
  this.ctx = canvasId.getContext("2d");

  this.w = this.ctx.canvas.width;
  this.h = this.ctx.canvas.height;

  this.grid = new Grid(this.ctx);
  this.piece = new Piece(this.ctx);
  this.nextPiece = new Piece(this.ctx, 400, 1);

  this.drawCount = 0;

  // this.points = 0;
  // this.totalPoints = 0;


  this.setListeners();
}

Game.prototype.start = function() {
  this.grid.reset();
  
  this.piece.getPiece();
  this.nextPiece.getPiece();
  drawIntervalId = setInterval(function() {
    this.drawCount++;

    if ((this.piece.y >= this.grid.y) && (this.nextPiece.isEnabled)){
      this.nextPiece.getPiece();
      this.nextPiece.isEnabled = false;
    }
  
    if (this.isGameOver()) {
      alert("game over!");
      window.location.reload();
    }

    this.clearAll();
    
    if (this.isCollisionDown()) {
      //this.checkCollisionDown();
      
      this.piece.y = (Math.floor((this.piece.y + this.piece.h)/GEM_HEIGTH) - PIECE_SIZE) * GEM_HEIGTH;
      this.grid.mergePiece(this.piece);
      this.grid.handleMatches(this.piece);

      this.piece.reset(this.nextPiece);
      
    
    }
 

    this.drawAll();

 
    if (((this.drawCount % 30) === 0) && (!this.grid.isWorking)) {
      this.piece.y += 10;
      this.drawCount = 0;
    }

  }.bind(this), DRAW_INTERVAL_MS);
}

Game.prototype.stop = function() {


}

Game.prototype.drawAll = function() {
  this.grid.draw();
  this.piece.draw();
  this.nextPiece.draw();
  this.grid.remarkMatches();
  this.drawScore();
}

Game.prototype.clearAll = function() {
  this.ctx.clearRect(0, 0, this.w, this.h);
}

Game.prototype.checkCollisionDown = function() {
  
  // if (this.piece.x < this.grid.x) {
  //   this.piece.x += GEM_WIDTH;
  // }
  // if (this.piece.x + GEM_WIDTH > this.grid.x + this.grid.w) {
  //   this.piece.x -= GEM_WIDTH;
  // }
  // if ((this.piece.y + this.piece.h) > (this.grid.y + this.grid.h)) {
  //   console.log("estoy encima en el suelo!");
  //   this.piece.y = (Math.floor((this.piece.y + this.piece.h)/GEM_HEIGTH) - PIECE_SIZE) * GEM_HEIGTH;
  //   //this.piece.y = (this.grid.y + this.grid.h) - this.piece.h;
  //   this.grid.mergePiece(this.piece);
  //   this.pie  ce.reset();
  // }  //lo quito porque lo de abajo funciona tb cuando se está en el suelo


  //if (this.grid.matrix[this.piece.x/GEM_WIDTH][Math.floor((this.piece.y + this.piece.h)/GEM_HEIGTH)] !== 0) {
    console.log("estoy encima de una gema!");
    
    /* this.piece.y = (Math.floor((this.piece.y + this.piece.h)/GEM_HEIGTH) - PIECE_SIZE) * GEM_HEIGTH;
    this.grid.mergePiece(this.piece);
    this.grid.handleMatches(this.piece); */


    // this.grid.removeMatches();
    // if (this.grid.areMatches()) {
      
    // }
    // this.grid.downGems();

    /* this.grid.removeChecks();
  
    if (this.grid.hasMatches) {
      this.grid.hasMatches = false;
      //this.remarkMatches();
      setTimeout(function() {
       this.grid.removeMatches();
       this.grid.downGems();
       this.grid.handleMatches();
       this.piece.reset(this.nextPiece);
      }.bind(this),1000);
      
    } */
     //this.piece.reset(this.nextPiece);
  //}
}

Game.prototype.setListeners = function() {
  document.onkeydown = this.onKeyDown.bind(this);
}

Game.prototype.onKeyDown = function(e) {
  switch (e.keyCode) {
    case KEY_RIGHT:
      if (!this.isCollisionRight()) {
        this.piece.x += 50;
      }
      break;
    case KEY_LEFT:
      if (!this.isCollisionLeft()) {
        this.piece.x += -50;
      }
      break;
    case KEY_DOWN:
      this.piece.y += 25;
      
        totalPoints += 0.25;
      
      break;
    case KEY_SPACE:
      this.piece.switchColors();
      break;
  }
}

Game.prototype.isCollisionRight = function() {
  // if ((this.piece.x + GEM_WIDTH > this.grid.x + this.grid.w) ||
  //   (this.grid.matrix[this.piece.x/GEM_WIDTH][Math.floor((this.piece.y + (PIECE_SIZE*GEM_HEIGTH))/GEM_HEIGTH)] !== 0)) {  
  //   this.piece.x -= GEM_WIDTH;

    return ((this.piece.x + GEM_WIDTH === this.grid.x + this.grid.w) ||
           (this.grid.matrix[(this.piece.x + GEM_WIDTH)/GEM_WIDTH][Math.floor((this.piece.y + (PIECE_SIZE*GEM_HEIGTH))/GEM_HEIGTH)] !== 0))
}

Game.prototype.isCollisionLeft = function() {
  // if ((this.piece.x < this.grid.x) ||
  //   (this.grid.matrix[(this.piece.x)/GEM_WIDTH][Math.floor((this.piece.y + (PIECE_SIZE*GEM_HEIGTH))/GEM_HEIGTH)] !== 0)) {  
  //     this.piece.x += GEM_WIDTH;
  // }
  return ((this.piece.x === this.grid.x) ||
         (this.grid.matrix[(this.piece.x - GEM_WIDTH)/GEM_WIDTH][Math.floor((this.piece.y + (PIECE_SIZE*GEM_HEIGTH))/GEM_HEIGTH)] !== 0)) 

}
Game.prototype.isCollisionDown = function() {
  return (this.grid.matrix[this.piece.x/GEM_WIDTH][Math.floor((this.piece.y + this.piece.h)/GEM_HEIGTH)] !== 0);
}

Game.prototype.isGameOver = function() {
  
  return (this.grid.matrix[Math.floor(NUM_COLUMNS_GRID / 2)][0] !== 0);
}

Game.prototype.drawScore = function() {
  //totalPoints += points;

  this.ctx.font = 'italic 60px Calibri';
  this.ctx.strokeStyle = "red";
  this.ctx.strokeText(points, 400, 250);

  this.ctx.font = '60px Calibri';
  this.ctx.fillStyle = "blue";
  this.ctx.fillText("Total points", 400, 350);
  this.ctx.font = '100px Calibri';
  this.ctx.fillText(Math.floor(totalPoints), 400, 450);
}