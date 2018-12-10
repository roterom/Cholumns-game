function Gem(ctx, team) { 
  
  /**********arguments****** */
  this.ctx = ctx;
  this.name = "";

  this.checks = {
    vertical: false,
    horizontal: false,
    diagonal2: false,
    diagonal0: false 
  };

  this.isMatched = false;
  this.img = new Image();
  this.img.frames = 8 
  this.img.frameIndex = 0;
  
  this.drawCount = 0;

  this.imgMatched = new Image();
  this.imgMatched.src = "./assets/images/matched2-sprite.png";
  this.imgMatched.frames = 10 
  this.imgMatched.frameIndex = 0;
  this.drawMatchedCount = 0;

  this.img.row;

  this.setImages(team);
}


Gem.prototype.setImages = function(team){

  switch (team) {

    case 0:
      this.img.src = "./assets/images/atleti-sprite-ladrillo.png";
      break;

      case 1:
      this.img.src = "./assets/images/atleti-sprite-ladrillo.png";
      break;

    case 2:
      this.img.src = "./assets/images/barsa-sprite-ladrillo.png";
      break; 
  }
}


Gem.prototype.configColor = function() {

  var keyColor = Math.floor((Math.random() * NUM_COLORS));

  switch (keyColor) {

    case 0:
      this.name = "#c84444";
      this.img.row = 0;
      break;

    case 1:
      this.name = "#ad6cce";
      this.img.row = 1;
      break;

    case 2:
      this.name = "#3e3eae";
      this.img.row = 2;
      break;

    case 3:
      this.name = "#5bc3ce";
      this.img.row = 3;
      break;

    case 4:
      this.name = "#57be53";
      this.img.row = 4;
      break;

    case 5:
      this.name = "#d7d788";
      this.img.row = 5;
      break;
  }
}


Gem.prototype.drawFilling = function(x, y, w, h) {

  this.drawCount++;

  if (this.img.src !== "") {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0 + this.img.row * (this.img.height/7),
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

  if (this.drawCount % FRECUENCY_ANIMATION_GEM === 0) {
    this.animate();
    this.drawCount = 0;
  }
}


Gem.prototype.drawBorder = function(x, y, w, h) {
 
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


    if (this.drawMatchedCount % FRECUENCY_ANIMATION_MATCH === 0) {
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