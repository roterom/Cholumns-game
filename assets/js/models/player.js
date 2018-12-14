function Player(canvasId, controls, x, y, team, conexionDOM, isModeTwoPlayers, name, competitionMode) {

  /*********arguments************** */
  this.ctx = canvasId.getContext("2d");
  this.controls = controls || {};
  this.x = x || 0;
  this.y = y || 0;
  this.team = team || 0;
  this.conexionDOM = conexionDOM;
  this.isModeTwoPlayers = isModeTwoPlayers;
  this.name = name || "";
  this.competitionMode = competitionMode || "";

  this.ctx.canvas.width = window.innerWidth;
  this.ctx.canvas.height = window.innerHeight;
  
  this.drawCount = 0;
  this.drawIntervalId = undefined;

  this.timeLevel = 0;                             //variable to be controlling when changing levels
  this.timeSpecialPiece = 0;                      //variable to be controlling when to add an extra piece
  this.timePenalty = 0;                           //variable to be controlled when adding a penalty
 
  this.speed = SPEED_INIT;                        //variable that determines when the piece must be dropped

  this.animateCount = 0;

  this.movements = {
    right: false,
    left: false,
    down: false,
    switchC: false,
    special: false,
    holded: false
  }

  this.isFinished = false;
  this.drawIntervalId = undefined;
  
  this.createInstances();
  this.setListeners();
}

//function to create the different instances of the prototypes
Player.prototype.createInstances = function() {
  
  this.bg = new Background(this.ctx, this.x, this.y, this.team);
  this.score = new Score(this.ctx, this.x + POS_X_SCORE + POS_X_GRID, this.y + POS_Y_GRID + POS_Y_SCORE)
  this.grid = new Grid(this.ctx, this.score, this.x + POS_X_GRID, this.y + POS_Y_GRID, this.conexionDOM);
  this.piece = new Piece(this.ctx, this.x+ ((NUM_COLUMNS_GRID * GEM_WIDTH) / 2) + POS_X_GRID, this.y-(GEM_HEIGTH * (PIECE_SIZE)) + POS_Y_GRID, this.team);
  this.nextPiece = new Piece(this.ctx, this.x + POS_X_NEXT_PIECE + POS_X_GRID, this.y+POS_Y_GRID, this.team);
  this.holdedPiece = new Piece(this.ctx, this.x + POS_X_HOLDED_PIECE + POS_X_GRID, POS_Y_HOLDED_PIECE + POS_Y_GRID, this.team, false, true);
  this.specialPieces = [];
  this.voices = new Sounds();
}


Player.prototype.setListeners = function() {
 
  document.addEventListener("keydown", this.onKeyDown.bind(this));
  document.addEventListener("keyup", this.onKeyUp.bind(this));
}


Player.prototype.start = function() {
  //function that increases the counters
  function increaseCounters() {
    this.drawCount++;
    this.timeLevel++;
    this.timeSpecialPiece++;
    this.timePenalty++;
  }
  //function that manages the piece
  function managePiece() {
    this.piece.place();                                                                  //we place the piece exactly in a correct position on the grid
    this.grid.mergePiece(this.piece);                                                    //we join the piece to the grid
    if (this.isGameOver()) {  //if is game over ...
      this.conexionDOM.$soundGameOver[0].src = "./assets/sound/events/game-over.m4a";    //we change to "gameOver" music
      this.stop();                                                                       //we stopped the game
    } else  { //if isn't game over ...
    this.grid.handleMatches(this.piece);                                                 //we call the function that handles possible matches
    this.piece.reset(this.nextPiece, this.x, this.y);                                    //we take the next piece to play with
    this.nextPiece.isSpecial = false;
    }
  }
  //function that makes the piece fall
  function downPiece() {
    if (((this.drawCount % this.speed) === 0) && (!this.grid.isWorking)) {  //if it is time for the piece to fall and the grid is not working ...
      this.piece.y += INCREASE_POS_Y;
      this.drawCount = 0;
    }
  }
  //function that manages the levels
  function manageLevel() {
    if (((this.timeLevel % LEVEL_DURATION) === 0) && (this.speed > SPEED_MIN)) {
      this.handleChangeLevel();
      this.conexionDOM.$soundEvents[0].src = "./assets/sound/events/level-up.m4a";
    }
  }
  //function that manages the special pieces  //function that manages the special pieces  
  function manageSpecialPiece() {
    if ((this.timeSpecialPiece % SPECIAL_FRECUENCY) === 0) {
      this.specialPieces.push(new Piece(this.ctx, this.x + POS_X_SPECIAL_PIECE +POS_X_GRID, POS_Y_SPECIAL_PIECE + POS_Y_GRID, true));
      this.conexionDOM.$soundEvents[0].src = "./assets/sound/events/xtra-special.m4a";
      this.timeSpecialPiece = 0;
    }
  }
  //function that manages the mode two players
  function manageCompetitionMode() {
    if ((this.timePenalty % PENALTY_FRECUENCY) === 0) {  //if it is time to generate a penalty ...
      this.timePenalty = 0;

      if (this.isModeTwoPlayers && (!this.competitionMode.isCompetitionFinished)) {  //if it is two players mode and the competition has not finished ...
        this.checkPenalties();

        setTimeout(function() {
          var trackPath = this.voices.getPathBattle();
          this.conexionDOM.$soundVoices[0].src = trackPath;                    //we throw a random sound of penalty
        }.bind(this), DELAY_VOICE);

        setTimeout(function(){
          this.grid.handleMatches();                                            //check the possible matches generated
        }.bind(this), DELAY_AFTER_MATCHES);
      }
    }
    if(this.isModeTwoPlayers) {
      this.setCompetitionMode();
    }  
  }
  /*************************the "START" function begins ...********************************* */
  this.grid.reset();
  this.piece.getPiece();
  this.nextPiece.matrix = this.piece.matrix.slice();

  for (var i = 0; i < NUM_INIT_SPECIAL_PIECES; i++) {     //we generate the corresponding special pieces
    this.specialPieces.push(new Piece(this.ctx, this.x + POS_X_SPECIAL_PIECE + POS_X_GRID, POS_Y_SPECIAL_PIECE + POS_Y_GRID, this.team, true));
  }
  this.specialPieces[0].getPiece();
  
  this.drawIntervalId = setInterval(function() {
  
    increaseCounters.call(this);                                                             //we increase counters

    if ((this.piece.y >= (this.grid.y - POS_Y_GRID)) && (this.nextPiece.isEnabled)){  //if the current piece already appears on the screen ...
      this.nextPiece.getPiece();                                                      //... we generate the next piece
      this.nextPiece.isEnabled = false;
    }

    this.clearAll();                                                                   //we erase everything
      
    if ((this.grid.isCollisionDown(this.piece)) && (!this.grid.isWorking)) {  //if the piece has collided and the grid is not working ...

      this.grid.isWorking = true;
      this.piece.place();
      this.conexionDOM.$soundEvents[0].src = "./assets/sound/events/collision.m4a";

      if (this.movements.down) {  //if we are pressing the down key ...
        managePiece.call(this);     //we call the "managePiece" function (..place piece, join piece to grid, look for possibles matches...)
      } else {  //if we are not pressing any key ...
        setTimeout(function() {                     //... we take a few moments to make some last movement
          if (this.grid.isCollisionDown(this.piece)) {  //if after that time, the piece continues to collide ...
            managePiece.call(this);                      //we call the "managePiece" function (..place piece, join piece to grid, look for possibles matches...)
          } else {  //if the piece is no longer colliding ...
            this.grid.isWorking = false;
          }
        }.bind(this),DELAY_AFTER_COLLISION);
      }
    }
    this.animate();
    this.drawAll();  
    downPiece.call(this);
    manageLevel.call(this);
    manageCompetitionMode.call(this);
    manageSpecialPiece.call(this);
  
  }.bind(this), DRAW_INTERVAL_MS);
}


Player.prototype.handleChangeLevel = function() {

  this.timeLevel = 0;
  
  if (this.speed < SPEED_FAST_MODE) {
    this.speed--;
  } else {
    this.speed -= SPEED_GAP;
  }
  this.score.level++;
}


Player.prototype.setCompetitionMode = function() {
   
  if (this.team === 0) {
    this.competitionMode.setPoints1(this.score.totalPoints);
  } else {
    this.competitionMode.setPoints2(this.score.totalPoints);
  }
}


Player.prototype.checkPenalties = function() {

  function changeDOMStates(path1, path2) {
    this.conexionDOM.$imgCompetitionPlayer1[0].src = path1;
    this.conexionDOM.$imgCompetitionPlayer2[0].src = path2;
    this.conexionDOM.$imgCompetitionPlayer1.fadeIn();
    this.conexionDOM.$imgCompetitionPlayer2.fadeIn();
    this.conexionDOM.$imgCompetitionPlayer1.fadeOut(DELAY_DRAW_AFTER_PENALTY);
    this.conexionDOM.$imgCompetitionPlayer2.fadeOut(DELAY_DRAW_AFTER_PENALTY);
  }

  var crossPath = "./assets/images/red-cross.png"; 
  var tickPath = "./assets/images/green-tick.png";

  if ((this.team === 0) && (this.competitionMode.pointsPlayer1 < this.competitionMode.pointsPlayer2)) {  //if player 1 has fewer points than player 2 ...
    changeDOMStates.call(this, crossPath, tickPath);
    this.penalty();
    this.conexionDOM.$soundEvents[0].src = "./assets/sound/events/penalty.m4a";
  } 
  
  if ((this.team != 0) && (this.competitionMode.pointsPlayer2 < this.competitionMode.pointsPlayer1)) {  //if player 2 has fewer points than player 1 ...
    changeDOMStates.call(this, tickPath, crossPath);
    this.penalty();
    this.conexionDOM.$soundEvents[0].src = "./assets/sound/events/penalty.m4a";
  }
}

//function that will insert an additional row of gems to the player who has the fewest points at that moment
Player.prototype.penalty = function() {

  function setPenaltyGems() {
    var gem = new Gem(this.ctx, this.team);
    gem.configColor();
    gem.isSpecial = false;
    this.grid.matrix[i].push(gem);
  }

  if (!this.grid.isWorking) {  //If the grid is not working ...

    this.grid.isWorking = true;
    
    for (var i = 0; i < NUM_COLUMNS_GRID; i++) {    
      setPenaltyGems.call(this);
      if (this.isGameOverModeCompetition(this.grid.matrix[i])) {  //if when we insert the gem, there is a game over ...
        setTimeout(function() {
          this.conexionDOM.$soundGameOver[0].src = "./assets/sound/events/game-over.m4a";
          this.stop();                                          //stop the game
        }.bind(this), 1000);
      }
      this.grid.matrix[i].shift(); 
    }
    this.piece.y -= GEM_HEIGTH;                           //we delay the piece just the size of a gem

    this.grid.isWorking = false;

  } else {  //If the grid is working ... 
    setTimeout(this.penalty.bind(this), 50);              //...I call the function again after a few moments
  }
}


Player.prototype.isGameOverModeCompetition = function(array) {
  
    return array.every(function(e) {
      return e instanceof Gem;
    });
}


Player.prototype.stop = function() {

  function setDOMStatesModeTwoPlayers() {
    if (this.team === 0) {
      this.conexionDOM.$points1.text(Math.floor(this.score.totalPoints));
      this.conexionDOM.$gameOver1.show();
    } else {
      this.conexionDOM.$points2.text(Math.floor(this.score.totalPoints));
      this.conexionDOM.$gameOver2.show();
    }
  }

  function setDOMStatesModeOnePlayer() {
    this.conexionDOM.$name.val(this.name)
    this.conexionDOM.$points.text(Math.floor(this.score.totalPoints));
    this.conexionDOM.$gameOver.show();
  }

  function setDOMSoundGameOver() {
    this.conexionDOM.$soundBg[0].src = "";
    setTimeout(function() {
      this.conexionDOM.$soundBg[0].src = "./assets/sound/background/columns-atropos.m4a";
    }.bind(this), DELAY_AFTER_GAME_OVER);
  }

  function setDOMSoundModeCompetition() {
    setTimeout(function() {
      var trackPath = this.voices.getPathGameOver();
      this.conexionDOM.$soundVoices[0].src = trackPath;
    }.bind(this), DELAY_AFTER_COMPETITION_FINISHED);
  }
  
  if (this.isModeTwoPlayers) {  //if is mode two players ...

    setDOMStatesModeTwoPlayers.call(this);
    if (this.competitionMode.isCompetitionFinished) {  //if the competition had already finished (that is, there was only one player left) ....
      setDOMSoundGameOver.call(this);
    } else {  //if the two players were still alive ....
      setDOMSoundModeCompetition.call(this);
    }
  } else {  //if is mode one player ...
    setDOMSoundGameOver.call(this);
    setDOMStatesModeOnePlayer.call(this);
  }
  clearInterval(this.drawIntervalId);
  this.drawIntervalId = undefined;
  this.isFinished = true;
  this.competitionMode.isCompetitionFinished = true;
}


Player.prototype.drawAll = function() {
  
  this.bg.draw();
  this.grid.draw();
  this.piece.draw();
  this.nextPiece.draw();
  this.holdedPiece.draw();
  this.specialPieces[0].drawSpecial(this.specialPieces.length - 1);
  this.grid.remarkMatches();
  this.score.draw();
}


Player.prototype.clearAll = function() {
 
  this.ctx.clearRect(this.x, this.y, this.w, this.h);
}


Player.prototype.onKeyDown = function(e) {
  
  switch (e.keyCode) {
    case this.controls.right:
      this.movements.right = true;
      break;

    case this.controls.left:
      this.movements.left = true;   
      break;

    case this.controls.down:
      this.movements.down = true;  
      break;

    case this.controls.switchC:
      this.movements.switchC = true;
      break;

    case this.controls.specialKey:
      this.movements.special = true;
      break;

    case this.controls.holdedKey:
      this.movements.holded = true;
      break;
  }
}


Player.prototype.animate = function() {
  
  if (this.movements.right) {
    if ((!this.grid.isCollisionRight(this.piece)) && ((this.animateCount % FRECUENCY_MOVEMENT_R_Y_L) === 0)) {
        this.piece.x += GEM_WIDTH;
    } 
  } 

  if (this.movements.left) {
    if ((!this.grid.isCollisionLeft(this.piece)) && ((this.animateCount % FRECUENCY_MOVEMENT_R_Y_L) === 0)) {
        this.piece.x += -GEM_WIDTH;
    } 
  }

  if (this.movements.down) {
    if ((!this.grid.isWorking) && ((this.animateCount % FRECUENCY_MOVEMENT_DOWN) === 0)) {
        this.piece.y += INCREASE_POS_Y_MOVEMENT;
        this.score.totalPoints += POINTS_BY_MOVEMENT;
    }
  } 

  if (this.movements.switchC) {  
      this.piece.switchColors();
      this.movements.switchC = false;
      this.conexionDOM.$soundKeys[0].src = "./assets/sound/keys/switch.m4a";
  } 

  if (this.movements.special) {
    if (this.specialPieces.length > 1) {  
        this.conexionDOM.$soundKeys[0].src = "./assets/sound/keys/special-piece.m4a";
        this.nextPiece.takeOutSpecial(this.specialPieces[0]);
        this.specialPieces.pop();
        this.movements.special = false;
    }
  }

  if (this.movements.holded) {
      this.handleHoldedPiece();
      this.movements.holded = false;
  }

  this.animateCount++;

  if (this.animateCount % MAX_ANIMATE_COUNT) {
    animateCount = 0;
  }
}


Player.prototype.onKeyUp = function(e) {
 
    switch (e.keyCode) {
      case this.controls.right:
        this.movements.right = false;
        break;

      case this.controls.left:
        this.movements.left = false;   
        break;

      case this.controls.down:
        this.movements.down = false;  
        break;
    }
}


Player.prototype.isGameOver = function() {
  
  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {
    if (this.grid.matrix[i][-1] instanceof Gem) {
      return true;
    }
  }
  return false;
}

Player.prototype.handleHoldedPiece = function() {
  
  if (!this.piece.isSpecial) {

    this.conexionDOM.$soundKeys[0].src = "./assets/sound/keys/hold-piece.m4a";
    
    if (!this.holdedPiece.matrix.length) { //if it is the first piece that we are going to retain
        this.holdedPiece.matrix = this.piece.matrix.slice();
        this.piece.matrix = this.nextPiece.matrix.slice();
        this.piece.isSpecial = this.nextPiece.isSpecial;
        this.nextPiece.isSpecial = false;
        this.nextPiece.getPiece();
    } else { //if we already had a pieza holded ...
      var auxMatrix = this.piece.matrix.slice();
      this.piece.matrix = this.holdedPiece.matrix.slice();
      this.holdedPiece.matrix = auxMatrix.slice();
    }
  }
}