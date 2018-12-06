
//function Game(canvas1 , canvas2, rival) {  esto es lo que tenía al principio
  function Game() {
  

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

 
 this.$start = $("#btn-start").click(function() {
   this.play();
 }.bind(this));

 this.$inputTeam = $("#input-group-teams").change(function() {
   this.setRival();
 }.bind(this));

 this.$btnSave = $("#btn-save").click(function() {
   this.saveScore();
 }.bind(this));

 this.$btnHighscore = $("#btn-highscore").click(function() {
   this.showHighscore();
 }.bind(this));

 this.scores = this.getScores();
}


//INTENTANDO IMPLEMENTAR FUNCIONES PARA LOS BOTONES

Game.prototype.showHighscore = function() {
    
  //var scores = getScores();


  var scoreArr = [];
  for (prop in this.scores) {
    if (this.scores.hasOwnProperty(prop)) {
      scoreArr.push({
        "key": prop,
        "value": this.scores[prop]
      });
    }
  }

  scoreArr.sort(function(a, b) {
    return b.value - a.value;
  });

 this.$scores.empty();

  var text = "";
  for (var i=0; i < scoreArr.length; i++) {
    text = "<ol class='score-saved'><span>" + scoreArr[i].key + "</span><span>" + scoreArr[i].value + "</span></ol>";
    this.$scores.append(text);
    if (i === 9) {
      break;
    }
  }
 }

Game.prototype.getScores = function() {
  var scores = localStorage.getItem("scores") || "{}";
  return JSON.parse(scores);
}

Game.prototype.addScore = function(name, points) {
  //var scores = getScores();

  

  // scores["S"+cont] = {
  //   name: name,
  //   team: team,
  //   score:value
  // }

  this.scores[name] = points;
  /* scores["name"] = name;
  scores["team"] = team;
  scores["score"] = value */
  // var newScore = {
  // name: name,
  // team: team,
  // score:value
  // }

  localStorage.setItem("scores", JSON.stringify(this.scores));
}

 Game.prototype.saveScore = function() {

  // var name = $("#name-player").val();
  // var team = $("#team").text();
  // var value = $("#points").text();

  if (this.$name.val()) {
    this.addScore(this.$name.val(), this.$points.text());
    this.$name.val("");
  }
  this.$gameOver.hide();
  this.$main.show();
 // window.location.reload()
  /* $("#game-over").toggle();
  $("#main").toggle(); */ 
 }


Game.prototype.setRival = function() {
  
  //var rivalTag = document.getElementById("rival");
  //rivalTag.innerHTML = "";
  //rivalTag.appendChild(document.createTextNode(this.options[this.selectedIndex].label.toUpperCase()));

  this.$rival.empty();
  this.$rival.text(this.$teamSelected.options[this.$teamSelected.selectedIndex].label.toUpperCase())
}


Game.prototype.play = function() {

  this.player1 = new Player(this.$canvas1, CONTROLS1, 0, 0);
  this.player1.start();

  if (this.$teamSelected.selectedIndex) {
    this.player2 = new Player(this.$canvas2, CONTROLS2, window.innerWidth/2 , 0, this.$teamSelected.selectedIndex);
    //var game = new Game($("#canvas-player1")[0]);
    this.player2.start();
  }
  this.$main.hide();
}

/************************************ */




/* Game.prototype.start = function() {
  
  this.player1.start();
  if (this.player2) {
    this.player2.start();
  }
} */