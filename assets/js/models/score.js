function Score(ctx, x, y) {

  this.ctx = ctx;

  this.x = x;
  this.y = y;

  this.parcialPoints = 0;
  this.totalPoints = 0;
  this.level = 1;
}

Score.prototype.draw =  function() {
  
  this.ctx.font = 'bold 80px Kalam';
  this.ctx.strokeStyle = "red";
  this.ctx.strokeText(this.parcialPoints, this.x, this.y);

  this.ctx.font = 'bold 35px Kalam';
  this.ctx.fillStyle = "blue";
  this.ctx.fillText("Marcador: " + Math.floor(this.totalPoints), this.x, this.y+80);
 
  this.ctx.fillStyle = "#fff";
  this.ctx.fillText("Nivel: " + this.level, this.x, this.y+140);

  this.ctx.font = '70px Calibri';
  //this.ctx.fillText(Math.floor(this.totalPoints), this.x, this.y+150);
}