function ConexionDOM() {
  
  this.$teamSelected = $("#input-group-teams")[0]
  
  this.$canvas1 = $("#canvas-player1")[0];
  this.$canvas2 = $("#canvas-player2")[0];
 
 /***********intentanto implementar los botones del html ****/

    //this.main = document.getElementById("main");
 this.$main = $("#main");
 this.$gameOver = $("#game-over");
 this.$game = $("#game");

 this.$name = $("#name-player");
 this.$points = $("#points");
 this.$rival = $("#rival");
 this.$scores = $("#scores");

 /********DE botones********* */
this.$btnStart = $("#btn-start");
this.$inputTeam = $("#input-group-teams");
this.$btnSave = $("btn-save");
this.$btnHighscore = $("btn-highscore");///me quede aquiiiiiiiiiiiiiiiiiiiiiiiiiii)

 /************** */
 
//  this.$start = $("#btn-start").click(function() {
//    this.play();
//  }.bind(this));

//  this.$inputTeam = $("#input-group-teams").change(function() {
//    this.setRival();
//  }.bind(this));

//  this.$btnSave = $("#btn-save").click(function() {
//    this.saveScore();
//  }.bind(this));

//  this.$btnHighscore = $("#btn-highscore").click(function() {
//    this.showHighscore();
//  }.bind(this));

}