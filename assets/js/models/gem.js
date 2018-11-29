function Gem(ctx) {
  this.name = "";
  this.checks = {
    vertical: false,
    horizontal: false,
    diagonal1: false,
    diagonal2: false 
  };

  this.ctx = ctx;
  //this.x = x;
  //this.y = y;

  this.isMatched = false;
  this.img = new Image();
  this.img.src = "./assets/images/atleti-sprite.png"

  this.img.frames = 8 
  this.img.frameIndex = 0;
  
  this.drawCount = 0;

  this.row;
}

Gem.prototype.configColor = function() {
  var keyColor = Math.floor((Math.random() * NUM_COLORS));
  switch (keyColor) {
    case 0:
      this.name = "#c84444";
      //this.img.src = "./assets/images/atletico-sprite.png"
      this.row = 0;
      break;
    case 1:
    this.name = "#ad6cce";
    //this.img.src = "./assets/images/diegoCosta sprite.png"
    this.row = 1;
    break;

    case 2:
    this.name = "#3e3eae";
    //this.img.src = "./assets/images/griezmann sprite.png"
    this.row = 2;
    break;

    case 3:
    this.name = "#5bc3ce";
    this.row = 3;
    break;

    case 4:
    this.name = "#57be53";
   // this.img.src = "./assets/images/barcelona-sprite.png"
    this.row = 4;
    break;

    case 5:
    this.name = "#d7d788";
    this.row = 5;
    break;
  }
}

Gem.prototype.draw = function(x, y) {
  this.drawCount++;
  if (this.img.src !== "") {
    
     this.ctx.fillStyle = this.name;
     this.ctx.fillRect(x, y, 50, 50);

    // this.ctx.drawImage(
    //   this.img,
    //   x,
    //   y,
    //   50,
    //   50
    // )
    
    //this.ctx.scale(0.8, 0.8);
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0 + this.row * (this.img.height/7),
      this.img.width/this.img.frames,
      this.img.height/7, 
      x,
      y,
      50,
      50);

      //this.ctx.scale(1, 1);
  } else {
    
    this.ctx.fillStyle = this.name;
    this.ctx.fillRect(x, y, 50, 50);
  }

  if (this.drawCount % 15 === 0) {
    this.animate();
    this.drawCount = 0;
  }
}

Gem.prototype.animate = function(x, y) {

  if (++this.img.frameIndex > (this.img.frames- 1)) {
    this.img.frameIndex = 0;
  } 
}

Gem.prototype.RemoveChecks = function(direction) {

  this.checks[direction] = false;

}