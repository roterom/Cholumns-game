function Game(canvasId) {
  this.ctx = canvasId.getContext("2d");

  this.w = this.ctx.canvas.width;
  this.h = this.ctx.canvas.height;

  this.grid = new Grid(this.ctx);
  this.piece = new Piece(this.ctx);

  this.drawCount = 0;
  this.setListeners();


}

Game.prototype.start = function() {
  this.grid.reset();
  this.piece.getPiece();
  drawIntervalId = setInterval(function() {
    this.drawCount++;

    this.clearAll();
    this.checkCollisionDown();
    this.drawAll();
    
    if ((this.drawCount % 30) === 0) {
      this.piece.y += 10;
    }

  }.bind(this), DRAW_INTERVAL_MS);

}

Game.prototype.stop = function() {


}

Game.prototype.drawAll = function() {
  this.grid.draw();
  this.piece.draw();

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
  if (this.grid.matrix[this.piece.x/GEM_WIDTH][Math.floor((this.piece.y + this.piece.h)/GEM_HEIGTH)] !== 0) {
    console.log("estoy encima de una gema!");
    
    this.piece.y = (Math.floor((this.piece.y + this.piece.h)/GEM_HEIGTH) - PIECE_SIZE) * GEM_HEIGTH;
    this.grid.mergePiece(this.piece);
    this.piece.reset();
  }

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

Game.prototype.isGameOver = function() {
  
}