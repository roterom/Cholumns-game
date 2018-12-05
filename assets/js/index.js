 document.addEventListener("DOMContentLoaded", function() {
 /*  var canvas1 = document.getElementById("canvas-player1");
  var canvas2 = document.getElementById("canvas-player2"); */

  var scores = getScores();
  //var cont = 0;
 
  // var btnStart = document.getElementById("btn-start");
   //btnStart.addEventListener("click", play);
   $("#btn-start")[0].addEventListener("click", play);
 // var mainDiv = document.getElementById("main"); */
  

// btnStart.addEventListener("click", function() {
//     var game = new Game(canvas1, canvas2);
//     game.start();
//     mainDiv.style.display = "none";
//   });

 


//$("#btn-start")[0].addEventListener("click", play);


//var choice = document.getElementById("input-group-teams");



/* $("#input-group-teams")[0].addEventListener("change", function() {

  var rival = document.getElementById("rival");
  rival.innerHTML = "";
  rival.appendChild(document.createTextNode(this.options[this.selectedIndex].label.toUpperCase()));
}); */

$("#input-group-teams")[0].addEventListener("change", setRival);

$("#btn-save")[0].addEventListener("click", saveScore);

$("#btn-highscore")[0].addEventListener("click", showHighscore);


 /*  var game = new Game(canvas1, canvas2);
  game.start(); */

 });

 function sortJSON(scores) {
  return scores.sort(function (a, b) {
      var x = scores.a, 
      y = scores.b;
           return ((x > y) ? -1 : ((x < y) ? 1 : 0));
          //return b-a;
  });
}

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

  

  // scores["S"+cont] = {
  //   name: name,
  //   team: team,
  //   score:value
  // }

  scores[name] = value;
  /* scores["name"] = name;
  scores["team"] = team;
  scores["score"] = value */
  // var newScore = {
  // name: name,
  // team: team,
  // score:value
  // }

  localStorage.setItem('scores', JSON.stringify(scores));
}

 function saveScore(cont) {

  var name = $("#name-player").val();
  var team = $("#team").text();
  var value = $("#points").text();

  addScore(name, team, value, cont);

  window.location.reload()
  /* $("#game-over").toggle();
  $("#main").toggle(); */ 
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