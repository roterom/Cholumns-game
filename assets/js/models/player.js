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

  this.timeLevel = 0;
  this.timeSpecialPiece = 0;
  this.timePenalty = 0;

  this.speed = SPEED_INIT;
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
  
  this.voices = new Sounds();

  this.createInstances();
  this.setListeners();
}


Player.prototype.start = function() {

  if (!this.isRunning()) {
    
    this.grid.reset();
    this.piece.getPiece();
    this.nextPiece.matrix = this.piece.matrix.slice();

    for (var i = 0; i < NUM_INIT_SPECIAL_PIECES; i++) {
      this.specialPieces.push(new Piece(this.ctx, this.x + POS_X_SPECIAL_PIECE + POS_X_GRID, POS_Y_SPECIAL_PIECE + POS_Y_GRID, this.team, true));
    }
    this.specialPieces[0].getPiece();
    
    this.drawIntervalId = setInterval(function() {
    
      this.drawCount++;
      this.timeLevel++;
      this.timeSpecialPiece++;
      this.timePenalty++;

      if ((this.piece.y >= (this.grid.y - POS_Y_GRID)) && (this.nextPiece.isEnabled)){
        this.nextPiece.getPiece();
        this.nextPiece.isEnabled = false;
      }

      if (this.isGameOver()) {
        this.conexionDOM.$soundEvents[0].src = "./assets/sound/events/game-over.m4a";
        this.stop();
      } else {
        this.clearAll();
        
        if ((this.grid.isCollisionDown(this.piece)) && (!this.grid.isWorking)) {
          
          this.grid.isWorking = true;
          this.piece.place();
          this.conexionDOM.$soundEvents[0].src = "./assets/sound/events/collision.m4a";

          if (this.movements.down) {
            this.piece.place();
            this.grid.mergePiece(this.piece);
            this.grid.handleMatches(this.piece);
            this.piece.reset(this.nextPiece, this.x, this.y);
            this.nextPiece.isSpecial = false;
          } else {
            setTimeout(function() {

              if (this.grid.isCollisionDown(this.piece)) {
                this.piece.place();
                this.grid.mergePiece(this.piece);
                this.grid.handleMatches(this.piece);
                this.piece.reset(this.nextPiece, this.x, this.y);
                this.nextPiece.isSpecial = false;
              } else {
                this.grid.isWorking = false;
              }
            }.bind(this),DELAY_AFTER_COLLISION);
          }
        }
        this.animate();
        this.drawAll();
    
        if (((this.drawCount % this.speed) === 0) && (!this.grid.isWorking)) {
          this.piece.y += 10;
          this.drawCount = 0;
        }

        if (((this.timeLevel % LEVEL_DURATION) === 0) && (this.speed > SPEED_MIN)) {
          this.handleChangeLevel();
          this.conexionDOM.$soundEvents[0].src = "./assets/sound/events/level-up.m4a";
        }

        if ((this.timePenalty % PENALTY_FRECUENCY) === 0) {
          this.timePenalty = 0;

          if (this.isModeTwoPlayers && (!this.competitionMode.isCompetitionFinished)) {
            this.checkPenalties();
            this.conexionDOM.$soundEvents[0].src = "./assets/sound/events/penalty.m4a";

            setTimeout(function() {
              var trackPath = this.voices.getPathBattle();
              this.conexionDOM.$soundVoices[0].src = trackPath;
            }.bind(this), DELAY_VOICE);

            this.grid.handleMatches();
          }
        }

        if ((this.timeSpecialPiece % SPECIAL_FRECUENCY) === 0) {
            this.specialPieces.push(new Piece(this.ctx, this.x + POS_X_SPECIAL_PIECE +POS_X_GRID, POS_Y_SPECIAL_PIECE + POS_Y_GRID, true));
            this.conexionDOM.$soundEvents[0].src = "./assets/sound/events/xtra-special.m4a";
            this.timeSpecialPiece = 0;
        }

        if(this.isModeTwoPlayers) {
          this.setCompetitionMode();
        }     
      }
    }.bind(this), DRAW_INTERVAL_MS);
  }
}


Player.prototype.createInstances = function() {
  
  this.bg = new Background(this.ctx, this.x, this.y, this.team);
  this.score = new Score(this.ctx, this.x + POS_X_SCORE + POS_X_GRID, this.y + POS_Y_GRID + POS_Y_SCORE)
  this.grid = new Grid(this.ctx, this.score, this.x + POS_X_GRID, this.y + POS_Y_GRID, this.conexionDOM);
  this.piece = new Piece(this.ctx, this.x+ ((NUM_COLUMNS_GRID * GEM_WIDTH) / 2) + POS_X_GRID, this.y-(GEM_HEIGTH * (PIECE_SIZE)) + POS_Y_GRID, this.team);
  this.nextPiece = new Piece(this.ctx, this.x + POS_X_NEXT_PIECE + POS_X_GRID, this.y+POS_Y_GRID, this.team);
  this.holdedPiece = new Piece(this.ctx, this.x + POS_X_HOLDED_PIECE + POS_X_GRID, POS_Y_HOLDED_PIECE + POS_Y_GRID, this.team, false, true);
  this.specialPieces = [];
}


Player.prototype.setListeners = function() {
 
  document.addEventListener("keydown", this.onKeyDown.bind(this));
  document.addEventListener("keyup", this.onKeyUp.bind(this));
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

  if ((this.team === 0) && (this.competitionMode.pointsPlayer1 < this.competitionMode.pointsPlayer2)) {
    this.conexionDOM.$imgCompetitionPlayer1[0].src = "./assets/images/red-crux.png";
    this.conexionDOM.$imgCompetitionPlayer2[0].src = "./assets/images/green-tick.png";
    this.conexionDOM.$imgCompetitionPlayer1.fadeIn();
    this.conexionDOM.$imgCompetitionPlayer2.fadeIn();
    this.conexionDOM.$imgCompetitionPlayer1.fadeOut(DELAY_DRAW_AFTER_PENALTY);
    this.conexionDOM.$imgCompetitionPlayer2.fadeOut(DELAY_DRAW_AFTER_PENALTY);

    this.penalty();
  } 
  
  if ((this.team != 0) && (this.competitionMode.pointsPlayer2 < this.competitionMode.pointsPlayer1)) {
    this.conexionDOM.$imgCompetitionPlayer1[0].src = "./assets/images/green-tick.png";
    this.conexionDOM.$imgCompetitionPlayer2[0].src = "./assets/images/red-crux.png";
    this.conexionDOM.$imgCompetitionPlayer1.fadeIn();
    this.conexionDOM.$imgCompetitionPlayer2.fadeIn();
    this.conexionDOM.$imgCompetitionPlayer1.fadeOut(DELAY_DRAW_AFTER_PENALTY);
    this.conexionDOM.$imgCompetitionPlayer2.fadeOut(DELAY_DRAW_AFTER_PENALTY);

    this.penalty();
  }
}


Player.prototype.penalty = function() {

  for (var i = 0; i < NUM_COLUMNS_GRID; i++) {    
    var gem = new Gem(this.ctx, this.team);
    gem.configColor();
    gem.isSpecial = false;
    this.grid.matrix[i].push(gem);
    this.grid.matrix[i].shift();
  }
  //voy a intentar a la vez retrasar la ficha una fila para evitar comprotamientos estraños cuando sube todo el grid
  this.piece.y -= GEM_HEIGTH;  
}


Player.prototype.stop = function() {
  
  if (this.isModeTwoPlayers) {

    if (this.team === 0) {
      this.conexionDOM.$points1.text(Math.floor(this.score.totalPoints));
      this.conexionDOM.$gameOver1.show();
    } else {
      this.conexionDOM.$points2.text(Math.floor(this.score.totalPoints));
      this.conexionDOM.$gameOver2.show();
    }
      
    if (this.competitionMode.isCompetitionFinished) {
      this.conexionDOM.$soundBg[0].src = "";
      setTimeout(function() {
        this.conexionDOM.$soundBg[0].src = "./assets/sound/background/columns-atropos.m4a";
      }.bind(this),1000);
    } else {
      setTimeout(function() {
        var trackPath = this.voices.getPathGameOver();
        this.conexionDOM.$soundVoices[0].src = trackPath;
      }.bind(this),2000);
    }
  } else {  
      this.conexionDOM.$soundBg[0].src = "";
      setTimeout(function() {
        this.conexionDOM.$soundBg[0].src = "./assets/sound/background/columns-atropos.m4a";
      }.bind(this),1000);

    this.conexionDOM.$name.val(this.name)
    this.conexionDOM.$points.text(Math.floor(this.score.totalPoints));
    this.conexionDOM.$gameOver.show();
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

Player.prototype.isRunning = function() {
 
  return this.drawIntervalId !== undefined;
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
    
    if (!this.holdedPiece.matrix.length) { //si es la rimera ver que nos metemos...
        this.holdedPiece.matrix = this.piece.matrix.slice();
        this.piece.matrix = this.nextPiece.matrix.slice();
        this.piece.isSpecial = this.nextPiece.isSpecial;
        this.nextPiece.isSpecial = false;
        this.nextPiece.getPiece();
    } else { // si ya había una pieza "holded"
      var auxMatrix = this.piece.matrix.slice();
      this.piece.matrix = this.holdedPiece.matrix.slice();
      this.holdedPiece.matrix = auxMatrix.slice();
    }
  }
}