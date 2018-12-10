function Background(ctx, x, y, team) {
  
  /*********arguments********* */
  this.ctx = ctx;
  this.x = x || 0;
  this.y = y || 0;
  this.team = team;
  
  this.w =  this.ctx.canvas.width;
  this.h = this.ctx.canvas.height;
  
  this.img = new Image();

  this.setImages(this.team);
}


Background.prototype.setImages = function(team){

  switch (team) {

    case 0:
      this.img.src = "./assets/images/fondo-atleti-escalado.png";
      break;

    case 1:
      this.img.src = "./assets/images/fondo-atleti-escalado.png";
      break;

    case 2:
      this.img.src = "./assets/images/fondo-barsa-escalado.png";
      break;
  }
}


Background.prototype.draw = function() {
 
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h
  );
  //this.ctx.restore(); 
}