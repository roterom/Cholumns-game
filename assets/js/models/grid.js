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