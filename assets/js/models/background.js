function Background(ctx, x, y) {
  
  this.ctx = ctx;
  this.w =  this.ctx.canvas.width;
  this.h = this.ctx.canvas.height;

  this.x = x || 0;
  this.y = y || 0;
  

  this.img = new Image();
  this.img.src = "./assets/images/fondo-atleti2.png";
}

Background.prototype.draw = function() {
  
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h
  );
}