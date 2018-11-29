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

  this.img.frames = 4 //el numero de "Marios" que tiene nuestro sprite
  this.img.frameIndex = 0;
  
  this.drawCount = 0;
}

Gem.prototype.configColor = function() {
  var keyColor = Math.floor((Math.random() * NUM_COLORS));
  switch (keyColor) {
    case 0:
      this.name = "green";
      this.img.src = "./assets/images/colchoneros.png"
      break;
    case 1:
    this.name = "red";
    break;

    case 2:
    this.name = "pink";
    break;

    case 3:
    this.name = "orange";
    break;

    case 4:
    this.name = "blue";
    break;

    case 5:
    this.name = "yellow";
    break;
  }
}

Gem.prototype.draw = function(x, y) {
  this.drawCount++;
  if (this.img.src !== "") {
    
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0,
      this.img.width/this.img.frames,
      this.img.height, 
      x,
      y,
      50,
      50);
  } else {
    
    this.ctx.fillStyle = this.name;
    this.ctx.fillRect(x, y, 50, 50);
  }

  if (this.drawCount % 10 === 0) {
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