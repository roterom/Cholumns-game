function Game() {
  
  this.isRunning = false;                      //variable to avoid pressing play several times in a row
  this.scores = this.getScores();              //variable that obtains the scores of the LocalStorage
  this.conexionDOM = new ConexionDOM();        //instance of the ConexionDOM prototype
}

Game.prototype.start = function() {
  this.conexionDOM.$soundBg[0].src = "./assets/sound/background/intro.m4a";         //we started background music
  this.setButtons();                                                                //configuration of menu buttons
}


Game.prototype.setButtons = function() {
  
  this.conexionDOM.$btnStart.click(function() {
    this.play();                                       //call to "play" function
    }.bind(this)); 
    
  this.conexionDOM.$inputPlayers.change(function() {
    this.setPlayers();                                 //call to "setPlayers" function
    }.bind(this));
  
  this.conexionDOM.$inputTeam.change(function() {
    this.setTeam();                                    //call to "setTeam" function
    }.bind(this));
  
  this.conexionDOM.$btnSave.click(function() {
    this.gameOverOnePlayerMode();                      //call to "gameOverOnePlayerMode" function
    }.bind(this));

  this.conexionDOM.$btnHighscore.click(function() {
    this.showHighscore();                              //call to  "showHighscore" function
  }.bind(this)); 

  this.conexionDOM.$btnOk.click(function() {
    this.gameOverTwoPlayersMode();                     //call to "gameOverTwoPlayersMode" function
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
  
  if (this.player1.isFinished) {  //if player1 has finished ...
    this.addScore(this.conexionDOM.$name1.val(), this.conexionDOM.$points1.text());      //add his score in LocalStorage (calling to "addSocre" function)
  } 

  if (this.player2.isFinished) {  //if player1 has finished ...
    this.addScore(this.conexionDOM.$name2.val(), this.conexionDOM.$points2.text());      //add his score in LocalStorage (calling to "addSocre" function)
  } 

  if (this.player1.isFinished && this.player2.isFinished) {  //in player1 and player2 have finished ...

    this.isRunning = false;                                                         //we put the variable to false to be able to play again
    this.conexionDOM.$soundBg[0].src = "./assets/sound/background/intro.m4a";       //we started background music
    this.resetDOM();                                                                //we reset de DOM variables
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

//function that shows the scores that are stored in "this.scores"
Game.prototype.showHighscore = function() {
    
  var scoreArr = [];

  for (prop in this.scores) {                   //"this.scores" is an object and we put his key-value in an array
    if (this.scores.hasOwnProperty(prop)) {
      scoreArr.push({
        "key": prop,
        "value": this.scores[prop]
      });
    }
  }

  scoreArr.sort(function(a, b) {            //we sort this array by value
    return b.value - a.value;
  });

  this.conexionDOM.$scores.empty();        //we empty in the DOM the scores...

  var text = "";

  for (var i=0; i < scoreArr.length; i++) {         //we put in the DOM the scores....
    text = "<div class='score-saved'><span>" +(i+1) + " - " + scoreArr[i].key + "</span><span>" + scoreArr[i].value + " PUNTOS</span></div>";
    this.conexionDOM.$scores.append(text);
    if (i === MAX_SCORES) {
      break;
    }
  }
}

//fuction that obtains the scores of the LocalStorage
Game.prototype.getScores = function() {

  var scores = localStorage.getItem("scores") || "{}";
  return JSON.parse(scores);
}

//function that adds a new score to the LocalStorage
Game.prototype.addScore = function(name, points) {
 
  var scores = this.getScores();

  if (scores.hasOwnProperty(name)) { //if that name is already in the "socores" ...

    if (Number.parseInt(scores[name]) < Number.parseInt(points)) {  //if the new score is greater than the one stored...
      this.scores[name] = points;
      localStorage.setItem("scores", JSON.stringify(this.scores));
    } 
  } else {  //if that name isn't in the "socores" ...
    this.scores[name] = points;
    localStorage.setItem("scores", JSON.stringify(this.scores));
  }
}

//function that manages the game over in single player mode
Game.prototype.gameOverOnePlayerMode = function() {

  this.isRunning = false;                                                                  //we put the variable to false to be able to play again
  this.conexionDOM.$soundBg[0].src = "./assets/sound/background/intro.m4a";                //we started background music

  if (this.conexionDOM.$name.val()) {  //if we put a name to save the score ...
    this.addScore(this.conexionDOM.$name.val(), this.conexionDOM.$points.text());          //add his score in LocalStorage (calling to "addSocre" function)
    this.conexionDOM.$name.val("");
  }
  this.conexionDOM.$gameOver.hide();                                                       //we hide the gameOver window
  this.conexionDOM.$main.fadeIn();                                                         //we show the main window
}


Game.prototype.setTeam = function() {
  
  this.conexionDOM.$nameTeam2.empty();

  if (this.conexionDOM.$teamSelected.selectedIndex != 0) {
    this.conexionDOM.$nameTeam2.text(this.conexionDOM.$teamSelected.options[this.conexionDOM.$teamSelected.selectedIndex].label.toUpperCase());
  }
}


Game.prototype.play = function() {

  if(!this.isRunning) {

    this.isRunning = true;

    var numPlayers = this.conexionDOM.$inputPlayers.val();
    
    if (numPlayers == 1) {
      this.player1 = new Player(this.conexionDOM.$canvas1[0], CONTROLS1, 0, 0, this.conexionDOM.$teamSelected.selectedIndex, this.conexionDOM, false);     //intance of "Player" prototype
      this.player1.start();                                                                           //call to "start" function of "player1"
      this.conexionDOM.$canvas1.show();                                                               //show the canvas window
      this.conexionDOM.$main.fadeOut(DELAY_FADEOUT);                                                  //hide the main window
      this.conexionDOM.$soundBg[0].src = "./assets/sound/background/columns-clotho.m4a";              //change the background music
    } else { //numPlayers == 2... 

      if ((this.conexionDOM.$name1.val() != 0) && (this.conexionDOM.$name2.val() != 0) &&(this.conexionDOM.$nameTeam2.text())) {  //if we have choose the names and the rival team ...
        this.competitionMode = new CompetitionMode();                                                                                                                 //intance of "CompetitionMode" prototype
        this.player1 = new Player(this.conexionDOM.$canvas1[0], CONTROLS1, 0, 0, 0, this.conexionDOM, true, this.conexionDOM.$name1.val(), this.competitionMode);     //intance of "Player" prototype
        this.player2 = new Player(this.conexionDOM.$canvas2[0], CONTROLS2, window.innerWidth/2 , 0, this.conexionDOM.$teamSelected.selectedIndex, this.conexionDOM, true, this.conexionDOM.$name2.val(), this.competitionMode);      //intance of "Player" prototype
        
        this.player1.start();                                                                   //call to "start" function of "player1"                             
        this.player2.start();                                                                   //call to "start" function of "player2"

        this.conexionDOM.$canvas1.show();                                                       //show the canvas window           
        this.conexionDOM.$canvas2.show();                                                       //show the canvas window
        this.conexionDOM.$main.fadeOut(DELAY_FADEOUT);                                          //hide the main window
        this.conexionDOM.$soundBg[0].src = "./assets/sound/background/columns-clotho.m4a";      //change the background music
      } else {  //if there is a missing field to be filled ...
        alert("Asegúrese de introducir el nombre de ambos jugadores y la equipo rival")
      }
    }
  } 
}