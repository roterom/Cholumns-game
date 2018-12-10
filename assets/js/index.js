 document.addEventListener("DOMContentLoaded", function() {

  var game = new Game();
  
 });





 // var btest = document.getElementById("btn-start");
 // var scores = getScores();
 
   //btnStart.addEventListener("click", play);


   /********************** */
   //$("#btn-start").click(play)
   /**************************** */
 // var mainDiv = document.getElementById("main"); */ // var btnStart = document.getElementById("btn-start");
  
//$("#btn-start")[0].addEventListener("click", play);


//var choice = document.getElementById("input-group-teams");





/********************** */
/* $("#input-group-teams")[0].addEventListener("change", setRival);
$("#btn-save")[0].addEventListener("click", saveScore);
$("#btn-highscore")[0].addEventListener("click", showHighscore);

 });

 function showHighscore() {
    
  var scores = getScores();

  var scoreArr = [];
  for (prop in scores) {
    if (scores.hasOwnProperty(prop)) {
      scoreArr.push({
        "key": prop,
        "value": scores[prop]
      });
    }
  }

  scoreArr.sort(function(a, b) {
    return b.value - a.value;
  });

 $("#scores").empty();

  var text = "";
  for (var i=0; i < scoreArr.length; i++) {
    text = "<div class='score-saved'><span>" + scoreArr[i].key + "</span><span>" + scoreArr[i].value + "</span></div>";
    $("#scores").append(text);
  }
 }

function getScores() {
  var scores = localStorage.getItem("scores") || "{}";
  return JSON.parse(scores);
}

function addScore(name, team, value) {
  var scores = getScores();
  scores[name] = value;
  localStorage.setItem('scores', JSON.stringify(scores));
}

 function saveScore(cont) {

  var name = $("#name-player").val();
  var team = $("#team").text();
  var value = $("#points").text();

  addScore(name, team, value, cont);

  window.location.reload()
  // $("#game-over").toggle();
  // $("#main").toggle(); 
 }


function setRival() {
  
  var rivalTag = document.getElementById("rival");
  rivalTag.innerHTML = "";
  rivalTag.appendChild(document.createTextNode(this.options[this.selectedIndex].label.toUpperCase()));
}


function play() {

  var rival = $("#input-group-teams")[0].selectedIndex;
  if (!rival) {
    var game = new Game($("#canvas-player1")[0]);
  } else {
    var game = new Game($("#canvas-player1")[0], $("#canvas-player2")[0], rival);
  }
  game.start();
  //$("#main")[0].style.display = "none";
  $("#main").hide();
}
 */

/*************************************** */