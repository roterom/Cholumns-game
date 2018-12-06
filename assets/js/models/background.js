function Background(ctx, x, y, rival) {
  
  this.ctx = ctx;
  this.w =  this.ctx.canvas.width;
  this.h = this.ctx.canvas.height;

  this.x = x || 0;
  this.y = y || 0;

  //this.mirror = mirror || undefined;  no vale para nada, intento fallido
  

  this.img = new Image();
  //this.img.src = "./assets/images/fondo-atleti2.png";

  this.setImages(rival);
}

Background.prototype.setImages = function(rival){

    switch (rival) {
      case 0:
        this.img.src = "./assets/images/fondo-atleti.png";
        break;
      case 1:
        this.img.src = "./assets/images/fondo-barsa.jpg";
        break;
    }
}

Background.prototype.draw = function() {
   ///TODO ESTO ESTA TOQUETEADO PORQUE HE ESTADO PROBANDO HACIENDO UN REFLEJO DE LA IMAGEN......
  /* this.ctx.save();
  if (mirror) { 
    this.ctx.translate(0, this.h);
    this.ctx.scale(1,-1);
  } else {
    this.ctx.translate(0, 0);
    this.ctx.scale(1, 1);
  }

  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h
  );
  
  this.ctx.restore();  */
  


 
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h
  );
 
 this.ctx.restore(); 
}