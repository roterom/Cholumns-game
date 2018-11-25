function Grid(ctx) {
  this.ctx = ctx;

  this.x = 0;
  this.y = 0;

  this.matrix = [];
}

Grid.prototype.reset= function() {

  for (var i = 0; i < MAX_COLUMNS_GRID; i++) {
    this.matrix.push([]);
    for (var j = 0; j <MAX_ROWS_GRID; j++) {
      this.matrix[i].push(0);
    }
  }
}

Grid.prototype.draw = function() {

  for (var i = 0; i < MAX_COLUMNS_GRID; i++) {
    for (var j = 0; j < MAX_ROWS_GRID; j++) {
      this.ctx.strokeRect(this.x + i*50, this.y + j*50, 50, 50);
    }
  }
}