function Gem(ctx) {
  this.name = "";
  this.checks = {
    vertical: false,
    horizontal: false,
    diagonal2: false,
    diagonal0: false 
  };

  this.ctx = ctx;
  //this.x = x;
  //this.y = y;

  this.isMatched = false;
  this.img = new Image();
  this.img.src = "./assets/images/atleti-sprite.png";
  this.img.frames = 8 
  this.img.frameIndex = 0;
  
  this.drawCount = 0;

  this.imgMatched = new Image();
  this.imgMatched.src = "./assets/images/matched2-sprite.png";
  this.imgMatched.frames = 10 
  this.imgMatched.frameIndex = 0;
  this.drawMatchedCount = 0;

  this.row;
}

Gem.prototype.configColor = function() {
  var keyColor = Math.floor((Math.random() * NUM_COLORS));
  switch (keyColor) {
    case 0:
      this.name = "#c84444";
      this.row = 0;
      break;
    case 1:
    this.name = "#ad6cce";
    this.row = 1;
    break;

    case 2:
    this.name = "#3e3eae";
    this.row = 2;
    break;

    case 3:
    this.name = "#5bc3ce";
    this.row = 3;
    break;

    case 4:
    this.name = "#57be53";
    this.row = 4;
    break;

    case 5:
    this.name = "#d7d788";
    this.row = 5;
    break;
  }
}

Gem.prototype.drawFilling = function(x, y, w, h) {
  this.drawCount++;
  if (this.img.src !== "") {
    
     this.ctx.fillStyle = this.name;
     this.ctx.fillRect(x, y, w, h);
    
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0 + this.row * (this.img.height/7),
      this.img.width/this.img.frames,
      this.img.height/7, 
      x,
      y,
      w,
      h);

  } else {
    
    this.ctx.fillStyle = this.name;
    this.ctx.fillRect(x, y, GEM_WIDTH, GEM_HEIGTH);
  }

  if (this.drawCount % 15 === 0) {
    this.animate();
    this.drawCount = 0;
  }
}

Gem.prototype.drawBorder = function(x, y, w, h) {
 // this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  //this.ctx.lineWidth = 1;
  this.ctx.strokeRect(x, y, w, h);
}

Gem.prototype.animate = function() {

  if (++this.img.frameIndex > (this.img.frames- 1)) {
    this.img.frameIndex = 0;
  } 
}

Gem.prototype.drawMatched = function(x, y, w, h) {

  
  this.drawMatchedCount++;

  this.ctx.drawImage(
    this.imgMatched,
    this.imgMatched.frameIndex * Math.floor(this.imgMatched.width / this.imgMatched.frames),
    0,
    this.imgMatched.width/this.imgMatched.frames,
    this.imgMatched.height, 
    x,
    y,
    w,
    h);


    if (this.drawMatchedCount % 7 === 0) {
      if (this.imgMatched.frameIndex < (this.imgMatched.frames- 1)) {
        this.imgMatched.frameIndex++;
      } 
      this.drawMatchedCount = 0;
    }
}

Gem.prototype.RemoveChecks = function(direction) {

  this.checks[direction] = false;

}

Gem.prototype.isChecked = function(direction) {
  return this.checks[direction]; 
}