function Background(ctx) {
  
  this.ctx = ctx;
  this.w =  this.ctx.canvas.width;
  this.h = this.ctx.canvas.height;
  

  this.img = new Image();
  this.img.src = "./assets/images/fondo-atleti2.png";
}

Background.prototype.draw = function() {
  
  this.ctx.drawImage(
    this.img,
    0,
    0,
    this.w,
    this.h
  );
}