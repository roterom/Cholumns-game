function Gem() {
  this.name = "";
  this.checks = {
    vertical: false,
    horizontal: false,
    diagonal1: false,
    diagonal2: false 
  };
  this.hasMatched = false;
}

Gem.prototype.configColor = function() {
  var keyColor = Math.floor((Math.random() * NUM_COLORS));
  switch (keyColor) {
    case 0:
      this.name = "green";
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

Gem.prototype.RemoveChecks = function(direction) {

  this.checks[direction] = false;

}