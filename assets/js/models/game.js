function Game() {
  
  this.scores = this.getScores();
  this.conexionDOM = new ConexionDOM();
  this.conexionDOM.$soundBg[0].src = "./assets/sound/background/intro.m4a";
  this.setButtons();  
}


Game.prototype.setButtons = function() {
  
  this.conexionDOM.$btnStart.click(function() {
    this.play();
    }.bind(this)); 
    
  this.conexionDOM.$inputPlayers.change(function() {
    this.setPlayers();
    }.bind(this));
  
  this.conexionDOM.$inputTeam.change(function() {
    this.setTeam();
    }.bind(this));
  
  this.conexionDOM.$btnSave.click(function() {
    this.gameOverOnePlayerMode();
    }.bind(this));

  this.conexionDOM.$btnHighscore.click(function() {
    this.showHighscore();
  }.bind(this));

  this.conexionDOM.$btnOk.click(function() {
    this.gameOverTwoPlayersMode();
  }.bind(this));
}


Game.prototype.resetDOM = function() {
  
  this.conexionDOM.$name.val("");
  this.conexionDOM.$name1.val("");
  this.conexionDOM.$name2.val("");
  this.conexionDOM.$gameOver.hide();
  this.conexionDOM.$gameOver1.hide();
  this.conexionDOM.$gameOver2.hide();
  this.conexionDOM.$inputPlayers[0].children[0].selected = true;
  this.conexionDOM.$inputTeam[0].children[0].selected = true;
  this.conexionDOM.$name1.hide();
  this.conexionDOM.$name2.hide();
  this.conexionDOM.$player2.hide();
  this.conexionDOM.$inputTeam.hide();
  this.conexionDOM.$nameTeam2.empty();
  this.conexionDOM.$nameTeam2.hide();
  this.conexionDOM.$canvas1.hide();
  this.conexionDOM.$canvas2.hide();
  this.conexionDOM.$main.fadeIn();
}


Game.prototype.gameOverTwoPlayersMode = function() {
  
  if (this.player1.isFinished) {
    this.addScore(this.conexionDOM.$name1.val(), this.conexionDOM.$points1.text());
  } 

  if (this.player2.isFinished) {
    this.addScore(this.conexionDOM.$name2.val(), this.conexionDOM.$points2.text());
  } 

  if (this.player1.isFinished && this.player2.isFinished) {
  
    this.conexionDOM.$soundBg[0].src = "./assets/sound/background/intro.m4a";
    this.resetDOM();
  }
}


Game.prototype.setPlayers = function() {
 
  this.conexionDOM.$name1.val("");
  this.conexionDOM.$name2.val("");
  this.conexionDOM.$name1.toggle();
  this.conexionDOM.$name2.toggle();
  this.conexionDOM.$player2.toggle();
  this.conexionDOM.$inputTeam.toggle();
  this.conexionDOM.$nameTeam2.toggle();
}


Game.prototype.showHighscore = function() {
    
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

  this.conexionDOM.$scores.empty();

  var text = "";

  for (var i=0; i < scoreArr.length; i++) {
    text = "<div class='score-saved'><span>" +(i+1) + " - " + scoreArr[i].key + "</span><span>" + scoreArr[i].value + " PUNTOS</span></div>";
    this.conexionDOM.$scores.append(text);
    if (i === MAX_SCORES) {
      break;
    }
  }
}


Game.prototype.getScores = function() {

  var scores = localStorage.getItem("scores") || "{}";
  return JSON.parse(scores);
}


Game.prototype.addScore = function(name, points) {
 
  var scores = this.getScores();

  if (scores.hasOwnProperty(name)) {

    if (Number.parseInt(scores[name]) < Number.parseInt(points)) {
      this.scores[name] = points;
      localStorage.setItem("scores", JSON.stringify(this.scores));
    } 
  } else {
    this.scores[name] = points;
    localStorage.setItem("scores", JSON.stringify(this.scores));
  }
}


 Game.prototype.gameOverOnePlayerMode = function() {

  this.conexionDOM.$soundBg[0].src = "./assets/sound/background/intro.m4a";

  if (this.conexionDOM.$name.val()) {
    this.addScore(this.conexionDOM.$name.val(), this.conexionDOM.$points.text());
    this.conexionDOM.$name.val("");
  }
  this.conexionDOM.$gameOver.hide();
  this.conexionDOM.$main.fadeIn();
}


Game.prototype.setTeam = function() {
  
  this.conexionDOM.$nameTeam2.empty();

  if (this.conexionDOM.$teamSelected.selectedIndex != 0) {
    this.conexionDOM.$nameTeam2.text(this.conexionDOM.$teamSelected.options[this.conexionDOM.$teamSelected.selectedIndex].label.toUpperCase());
  }
}


Game.prototype.play = function() {

  var numPlayers = this.conexionDOM.$inputPlayers.val();
  
  if (numPlayers == 1) {
    this.player1 = new Player(this.conexionDOM.$canvas1[0], CONTROLS1, 0, 0, this.conexionDOM.$teamSelected.selectedIndex, this.conexionDOM, false);
    this.player1.start();
    this.conexionDOM.$canvas1.show();
    this.conexionDOM.$main.fadeOut(2000);
    this.conexionDOM.$soundBg[0].src = "./assets/sound/background/columns-clotho.m4a";
  } else { //numPlayers == 2... 

    if ((this.conexionDOM.$name1.val() != 0) && (this.conexionDOM.$name2.val() != 0) &&(this.conexionDOM.$nameTeam2.text())) {
      this.competitionMode = new CompetitionMode();
      this.player1 = new Player(this.conexionDOM.$canvas1[0], CONTROLS1, 0, 0, 0, this.conexionDOM, true, this.conexionDOM.$name1.val(), this.competitionMode);
      this.player2 = new Player(this.conexionDOM.$canvas2[0], CONTROLS2, window.innerWidth/2 , 0, this.conexionDOM.$teamSelected.selectedIndex, this.conexionDOM, true, this.conexionDOM.$name2.val(), this.competitionMode);
      
      this.player1.start();
      this.player2.start();

      this.conexionDOM.$canvas1.show();
      this.conexionDOM.$canvas2.show();
      this.conexionDOM.$main.fadeOut(2000);

      this.conexionDOM.$soundBg[0].src = "./assets/sound/background/columns-clotho.m4a";
    } else {
      alert("Asegúrese de introducir el nombre de ambos jugadores y la equipo rival")
    }
  } 
}