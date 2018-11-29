function Score(ctx) {

  this.ctx = ctx;

  this.parcialPoints = 0;
  this.totalPoints = 0;
}

Score.prototype.draw =  function() {
  
  this.ctx.font = 'italic 60px Calibri';
  this.ctx.strokeStyle = "red";
  this.ctx.strokeText(this.parcialPoints, 400, 250);

  this.ctx.font = '60px Calibri';
  this.ctx.fillStyle = "blue";
  this.ctx.fillText("Total points", 400, 350);
  this.ctx.font = '100px Calibri';
  this.ctx.fillText(Math.floor(this.totalPoints), 400, 450);
}