function ConexionDOM() {
   
   /*************canvas************ */
   this.$canvas1 = $("#canvas-player1");
   this.$canvas2 = $("#canvas-player2");

   /**********divs, inputs, labels...****************** */
   this.$teamSelected = $("#input-group-teams")[0]
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
   this.$player2 = $("#player2");
   this.$nameTeam2 = $("#name-team2");

   /********buttons********* */
   this.$btnStart = $("#btn-start");
   this.$inputTeam = $("#input-group-teams");
   this.$btnSave = $("#btn-save");
   this.$btnHighscore = $("#btn-highscore");
   this.$inputPlayers = $("#input-players");
   this.$btnOk = $(".my-btn-ok");

   /*******sounds******* */
   this.$soundBg = $("#sound-bg");
   this.$soundEvents = $("#sound-events");
   this.$soundKeys = $("#sound-keys");
   this.$soundVoices = $("#sound-voices");
   this.$soundSuccess = $("#sound-success");
   this.$soundGameOver = $("#sound-game-over");

   /********images*********    */
   this.$imgCompetitionPlayer1 = $("#img-competition-player1");
   this.$imgCompetitionPlayer2 = $("#img-competition-player2");
}