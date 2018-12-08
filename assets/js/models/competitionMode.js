function CompetitionMode () {
  
  this.pointsPlayer1;
  this.pointsPlayer2;
  this.isCompetitionFinished = false;
}

CompetitionMode.prototype.setPoints1 = function(points) {
  
  this.pointsPlayer1 = points; 
}

CompetitionMode.prototype.setPoints2 = function(points) {
  
  this.pointsPlayer2 = points; 
}