function ConexionDOM() {
  
   //this.$playersSelected = $("#input-players")[0];
  this.$teamSelected = $("#input-group-teams")[0]
  
//   this.$canvas1 = $("#canvas-player1")[0];
//   this.$canvas2 = $("#canvas-player2")[0];

  this.$canvas1 = $("#canvas-player1");
  this.$canvas2 = $("#canvas-player2");
 
 /***********intentanto implementar los botones del html ****/

    //this.main = document.getElementById("main");
 this.$main = $("#main");
 this.$gameOver = $("#game-over");
 this.$gameOver1 = $("#game-over1");
 this.$gameOver2 = $("#game-over2");
 this.$game = $("#game");

 this.$name = $("#name-player");
 this.$name1 = $("#name-player1");
 this.$name2 = $("#name-player2");
 this.$points = $("#points");
 this.$points1 = $("#points1");
 this.$points2 = $("#points2");
 this.$rival = $("#rival");
 this.$scores = $("#scores");

//  this.$namePlayer1 = $("#name-player1");
//  this.$namePlayer2 = $("#name-player2");
 this.$player2 = $("#player2");
 this.$nameTeam2 = $("#name-team2");

 /********DE botones********* */
this.$btnStart = $("#btn-start");
this.$inputTeam = $("#input-group-teams");
this.$btnSave = $("#btn-save");
this.$btnHighscore = $("#btn-highscore");
this.$inputPlayers = $("#input-players");
this.$btnOk = $(".my-btn-ok");

 /************** */

 this.$soundBg = $("#sound-bg");
 this.$soundEvents = $("#sound-events");
 this.$soundKeys = $("#sound-keys");
 this.$soundVoices = $("#sound-voices");
/*  this.$soundMagic = $("#sound-magic"); */


 this.$imgCompetitionPlayer1 = $("#img-competition-player1");
 this.$imgCompetitionPlayer2 = $("#img-competition-player2");

 
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