function Score(ctx, x, y) {

  this.ctx = ctx;

  this.x = x;
  this.y = y;

  this.parcialPoints = 0;
  this.totalPoints = 0;
}

Score.prototype.draw =  function() {
  
  this.ctx.font = 'italic 50px Calibri';
  this.ctx.strokeStyle = "red";
  this.ctx.strokeText(this.parcialPoints, this.x, this.y);

  this.ctx.font = '35px Calibri';
  this.ctx.fillStyle = "blue";
  this.ctx.fillText("Total points", this.x, this.y+80);
  this.ctx.font = '70px Calibri';
  this.ctx.fillText(Math.floor(this.totalPoints), this.x, this.y+150);
}