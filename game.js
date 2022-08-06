var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


// detect when a keyboard key has been pressed
$(document).keypress(function() {
  if (!started) {
    // h1 starts w/ "Press A Key to Start", when the game has started, change to "Level 0".
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});


// detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  // store the id of the button that got clicked
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Call checkAnswer() after a user clicked, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});


// check if the most recent user answer is the same as the game pattern
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    // check if the palyer have finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    // find "game-over" class in styles.css
    $("body").addClass("game-over");
    // Change the h1 title
    $("#level-title").text("Game Over😔 Press Any Key to Restart");
    // apply this class to the body of the website when wrong, then remove it after 200 milliseconds.
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    // Call startOver()
    startOver();
  }
}


function nextSequence() {
  // reset the userClickedPattern to an empty array  for the next level
  userClickedPattern = [];
  // increase the level by 1 every time nextSequence() is called
  level++;
  // update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  // generate a new random number between 0 and 3, and store it in randomNumber
  // use the randomNumber to select a random colour from the buttonColours array for randomChosenColor
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // select the button with the same id as the randomChosenColour,  animate a flash
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function playSound(name) {
  // play the sound for the button colour selected
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  // remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  // reset the values
  level = 0;
  gamePattern = [];
  started = false;
}
