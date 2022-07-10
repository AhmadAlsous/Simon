$(document).ready(function () {
  const buttonColors = ["red", "blue", "green", "yellow"];
  let gamePattern = [];
  let userClickedPattern = [];
  let level = 0;
  let canPress = false;
  $(document).one("keypress", nextSequence);
  function nextSequence() {
    canPress = true;
    let i = 0;
    userClickedPattern = [];
    level++;
    $("h1").fadeToggle(250);
    setTimeout(function () {
      $("h1").fadeToggle(250);
      $("h1").text("Level " + level);
    }, 200);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    let stopID = setInterval(function () {
      startColor(gamePattern[i]);
      i++;
      if (i === gamePattern.length) clearInterval(stopID);
    }, 350);
  }
  $(".btn").click(function () {
    if (canPress) {
      let userChosenColor = this.id;
      userClickedPattern.push(userChosenColor);
      animatePress(userChosenColor);
      playSound(userChosenColor);
      checkAnswer(userClickedPattern.length - 1);
    }
  });

  function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function startColor(color) {
    playSound(color);
    visablity(color);
    setTimeout(function () {
      visablity(color);
    }, 200);
  }
  function visablity(color) {
    $("#" + color).toggleClass("hidden");
  }

  function animatePress(color) {
    press(color);
    setTimeout(function () {
      press(color);
    }, 100);
  }
  function press(currentColor) {
    $("#" + currentColor).toggleClass("pressed");
  }

  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (gamePattern.length === userClickedPattern.length)
        setTimeout(nextSequence, 500);
    } else {
      playSound("wrong");
      gameOver();
      startOver();
    }
  }
  function gameOver() {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
  }

  function startOver() {
    level = 0;
    gamePattern = [];
    $(document).one("keypress", nextSequence);
  }
});
