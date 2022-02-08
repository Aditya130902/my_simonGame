var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var start = false;

function handler() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound("sounds/" + userChosenColor + ".mp3");
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
}

function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("#" + randomChoosenColor).fadeOut(100).fadeIn(100);
  playSound("sounds/" + randomChoosenColor + ".mp3");
  level = level + 1;
  $("h1").text("Level " + level);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  }else{
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  start = false;
}

$(".btn").on("click", handler);

$(document).on("keydown", function() {
  if(!start){
    nextSequence();
    start = true;
  }

})










// $("body").addClass("game-over");
// $("h1").text("Game Over, Press Any Key to Restart");
// setTimeout(function() {
//   $("body").removeClass("game-over");
// }, 200);
