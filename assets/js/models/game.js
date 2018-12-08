
//function Game(canvas1 , canvas2, rival) {  esto es lo que tenía al principio
  function Game() {
  

//   this.$teamSelected = $("#input-group-teams")[0]
//   this.$canvas1 = $("#canvas-player1")[0];
//   this.$canvas2 = $("#canvas-player2")[0];
 
//  /***********intentanto implementar los botones del html ****/

//     //this.main = document.getElementById("main");
//  this.$main = $("#main");
//  this.$gameOver = $("#game-over");
//  this.$game = $("#game");

//  this.$name = $("#name-player");
//  this.$points = $("#points");
//  this.$rival = $("#rival");
//  this.$scores = $("#scores");

 
//this.start = $("#btn-start").click(function() {
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

//  this.scores = this.getScores();

this.player1;
this.player2;

this.scores = this.getScores();
this.conexionDOM = new ConexionDOM();
this.competitionMode = new CompetitionMode();

this.setButtons();

// this.conexionDOM.$inputTeam.change(function() {
//   this.setRival();
//   }.bind(this));


// this.conexionDOM.$btnStart.click(function() {
//   this.play();
//   }.bind(this));

// this.conexionDOM.$btnSave.click(function() {
//   this.saveScore();
//   }.bind(this));

//   this.conexionDOM.$btnHighscore.click(function() {
//     this.showHighscore();
//     }.bind(this));
}


//INTENTANDO IMPLEMENTAR FUNCIONES PARA LOS BOTONES

// Game.prototype.showHighscore = function() {
    
//   //var scores = getScores();


//   var scoreArr = [];
//   for (prop in this.scores) {
//     if (this.scores.hasOwnProperty(prop)) {
//       scoreArr.push({
//         "key": prop,
//         "value": this.scores[prop]
//       });
//     }
//   }

//   scoreArr.sort(function(a, b) {
//     return b.value - a.value;
//   });

//  this.$scores.empty();

//   var text = "";
//   for (var i=0; i < scoreArr.length; i++) {
//     text = "<ol class='score-saved'><span>" + scoreArr[i].key + "</span><span>" + scoreArr[i].value + "</span></ol>";
//     this.$scores.append(text);
//     if (i === 9) {
//       break;
//     }
//   }
//  }

// Game.prototype.getScores = function() {
//   var scores = localStorage.getItem("scores") || "{}";
//   return JSON.parse(scores);
// }

// Game.prototype.addScore = function(name, points) {
//   //var scores = getScores();

  

//   // scores["S"+cont] = {
//   //   name: name,
//   //   team: team,
//   //   score:value
//   // }

//   this.scores[name] = points;
//   /* scores["name"] = name;
//   scores["team"] = team;
//   scores["score"] = value */
//   // var newScore = {
//   // name: name,
//   // team: team,
//   // score:value
//   // }

//   localStorage.setItem("scores", JSON.stringify(this.scores));
// }

//  Game.prototype.saveScore = function() {

//   // var name = $("#name-player").val();
//   // var team = $("#team").text();
//   // var value = $("#points").text();

//   if (this.$name.val()) {
//     this.addScore(this.$name.val(), this.$points.text());
//     this.$name.val("");
//   }
//   this.$gameOver.hide();
//   this.$main.show();
//  // window.location.reload()
//   /* $("#game-over").toggle();
//   $("#main").toggle(); */ 
//  }


// Game.prototype.setRival = function() {
  
//   //var rivalTag = document.getElementById("rival");
//   //rivalTag.innerHTML = "";
//   //rivalTag.appendChild(document.createTextNode(this.options[this.selectedIndex].label.toUpperCase()));

//   this.$rival.empty();
//   this.$rival.text(this.$teamSelected.options[this.$teamSelected.selectedIndex].label.toUpperCase())
// }


// Game.prototype.play = function() {

//   this.player1 = new Player(this.$canvas1, CONTROLS1, 0, 0);
//   this.player1.start();

//   if (this.$teamSelected.selectedIndex) {
//     this.player2 = new Player(this.$canvas2, CONTROLS2, window.innerWidth/2 , 0, this.$teamSelected.selectedIndex);
//     //var game = new Game($("#canvas-player1")[0]);
//     this.player2.start();
//   }
//   this.$main.hide();
// }

/************************************ */



//ESTOY PROBANDO SI FUNCIONA CON LA INSTANCIA 'CONEXION DOM'
/********************** */
Game.prototype.setButtons = function() {
  
  this.conexionDOM.$btnStart.click(function() {
    this.play();
    }.bind(this)); 
    
  
  this.conexionDOM.$inputPlayers.change(function() {
    this.setPlayers();
    }.bind(this));
  
  this.conexionDOM.$inputTeam.change(function() {
    this.setRival();
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


    //this.start = $("#btn-start").click(function() {
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

Game.prototype.reset = function() {
  
  this.conexionDOM.$name.val("");
  this.conexionDOM.$name1.val("");
  this.conexionDOM.$name2.val(""); 
  this.conexionDOM.$gameOver.hide();
  this.conexionDOM.$gameOver1.hide();
  this.conexionDOM.$gameOver2.hide();
  //this.$inputPlayers.selectedIndex("0");
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

  this.conexionDOM.$main.show();
}

Game.prototype.gameOverTwoPlayersMode = function() {

  this.addScore(this.conexionDOM.$name.val(), this.conexionDOM.$points.text());
  //this.conexionDOM.$name.val("");
  
  if (this.player1.isFinished) {
    this.addScore(this.conexionDOM.$name1.val(), this.conexionDOM.$points1.text());
   // this.conexionDOM.$name1.val("");
  } 

  if (this.player2.isFinished) {
    this.addScore(this.conexionDOM.$name2.val(), this.conexionDOM.$points2.text());
   // this.conexionDOM.$name2.val("");
  } 

  if (this.player1.isFinished && this.player2.isFinished) {
    /* this.conexionDOM.$namePlayer1.val("");
    this.conexionDOM.$namePlayer2.val(""); */

    // this.conexionDOM.$gameOver.css("margin-left", "-375px");



   /*  this.conexionDOM.$gameOver1.hide();
    this.conexionDOM.$gameOver2.hide();
    this.conexionDOM.$main.show(); */

    this.reset();
  }
}

Game.prototype.setPlayers = function() {
 
  //var numPlayers = this.conexionDOM.$inputPlayers.val();
  
  //if (numPlayers == 1) {


    this.conexionDOM.$name1.val("");
    this.conexionDOM.$name2.val("");
    this.conexionDOM.$name1.toggle();
    this.conexionDOM.$name2.toggle();
    this.conexionDOM.$player2.toggle();
    this.conexionDOM.$inputTeam.toggle();
    this.conexionDOM.$nameTeam2.toggle();
  //}
}

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

 this.conexionDOM.$scores.empty();

  var text = "";
  for (var i=0; i < scoreArr.length; i++) {
    text = "<div class='score-saved'><span>" +(i+1) + " - " + scoreArr[i].key + "</span><span>" + scoreArr[i].value + " PUNTOS</span></div>";
    this.conexionDOM.$scores.append(text);
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

 Game.prototype.gameOverOnePlayerMode = function() {

  // var name = $("#name-player").val();
  // var team = $("#team").text();
  // var value = $("#points").text();

  if (this.conexionDOM.$name.val()) {
    this.addScore(this.conexionDOM.$name.val(), this.conexionDOM.$points.text());
    this.conexionDOM.$name.val("");
  }
  //this.conexionDOM.$gameOver.css("margin-left", "-375px");
  this.conexionDOM.$gameOver.hide();
  this.conexionDOM.$main.show();
 // window.location.reload()
  /* $("#game-over").toggle();
  $("#main").toggle(); */ 
 }


Game.prototype.setRival = function() {
  
  //var rivalTag = document.getElementById("rival");
  //rivalTag.innerHTML = "";
  //rivalTag.appendChild(document.createTextNode(this.options[this.selectedIndex].label.toUpperCase()));

  //this.conexionDOM.$rival.empty();
  //this.conexionDOM.$rival.text(this.conexionDOM.$teamSelected.options[this.conexionDOM.$teamSelected.selectedIndex].label.toUpperCase());

  this.conexionDOM.$nameTeam2.empty();
  if (this.conexionDOM.$teamSelected.selectedIndex != 0) {
    this.conexionDOM.$nameTeam2.text(this.conexionDOM.$teamSelected.options[this.conexionDOM.$teamSelected.selectedIndex].label.toUpperCase());
  }
}
Game.prototype.play = function() {
/* 
  this.player1 = new Player(this.conexionDOM.$canvas1, CONTROLS1, 0, 0, this.conexionDOM.$teamSelected.selectedIndex, this.conexionDOM);
  this.player1.start();

  if (this.conexionDOM.$teamSelected.selectedIndex) {
    this.player2 = new Player(this.conexionDOM.$canvas2, CONTROLS2, window.innerWidth/2 , 0, this.conexionDOM.$teamSelected.selectedIndex, this.conexionDOM);
    //var game = new Game($("#canvas-player1")[0]);
    this.player2.start();
  }
  this.conexionDOM.$main.hide(); */



  var numPlayers = this.conexionDOM.$inputPlayers.val();
  
  if (numPlayers == 1) {
    this.player1 = new Player(this.conexionDOM.$canvas1[0], CONTROLS1, 0, 0, this.conexionDOM.$teamSelected.selectedIndex, this.conexionDOM, false);
    this.player1.start();
    this.conexionDOM.$canvas1.show();
    this.conexionDOM.$main.hide();
  } else { //numPlayers == 2... 
    if ((this.conexionDOM.$name1.val() != 0) && (this.conexionDOM.$name2.val() != 0) &&(this.conexionDOM.$nameTeam2.text())) {
      this.player1 = new Player(this.conexionDOM.$canvas1[0], CONTROLS1, 0, 0, 0, this.conexionDOM, true, this.conexionDOM.$name1.val(), this.competitionMode);
      this.player2 = new Player(this.conexionDOM.$canvas2[0], CONTROLS2, window.innerWidth/2 , 0, this.conexionDOM.$teamSelected.selectedIndex, this.conexionDOM, true, this.conexionDOM.$name2.val(), this.competitionMode);
      this.player1.start();
      this.player2.start();
      this.conexionDOM.$canvas1.show();
      this.conexionDOM.$canvas2.show();
      this.conexionDOM.$main.hide();
    } else {
      alert("Asegúrese de introducir el nombre de ambos jugadores y la equipo rival")
    }
  } 
}

/********************* */



/* Game.prototype.start = function() {
  
  this.player1.start();
  if (this.player2) {
    this.player2.start();
  }
} */




Game.prototype.boycott = function() {
  
  if (this.player1.score.totalPoints > this.player2.score.totalPoints) {
    game.penalty(this.player2);
  } else {
    game.penalty(this.player1)
  }
}




//this.grid = new Grid(this.ctx, this.score, this.x + POS_X_GRID, this.y + POS_Y_GRID);
//this.piece = new Piece(this.ctx, this.x+ ((NUM_COLUMNS_GRID * GEM_WIDTH) / 2) + POS_X_GRID, this.y-(GEM_HEIGTH * (PIECE_SIZE)) + POS_Y_GRID);