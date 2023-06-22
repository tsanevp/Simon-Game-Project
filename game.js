// Variables maintaining starting game state
var gamePattern = [];
var roundPatternInd = 0;
var levelCount = 1;
var gameStarted = false;
var patternPlaying = false;

// On key press start game if not already started
$(document).keypress(function () {
    if (!gameStarted) startGame();
});

$(".btn").click(function () {
    // Check if game has started or if pattern is currently playing
    if (!gameStarted || patternPlaying) {
        return;
    }

    // Compare the button clicked to the next button in pattern
    var nextButtonInPattern = gamePattern[roundPatternInd]
    var color = this.id;
    clickedBtn(color);

    // Wrong button clicked, reset the game state and start over
    if (color !== nextButtonInPattern) {
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 250);

        gameStarted = false;
        return;
    }

    // Correct button clicked, check if pattern has been completed
    roundPatternInd += 1;
    if (roundPatternInd === gamePattern.length) {
        patternPlaying = true;
        setTimeout(function () {
            addBtnToPattern();
        }, 1000);

        roundPatternInd = 0;
        levelCount += 1;
        $("#level-title").text("Level " + levelCount);
    }
});

// Start the game and set initial state
function startGame() {
    gameStarted = true;
    gamePattern = [];
    levelCount = 1;
    roundPatternInd = 0;

    addBtnToPattern();
    $("#level-title").text("Level " + levelCount);
}

// Adds a button to the pattern at random
function addBtnToPattern() {
    var btnColors = ['green', 'red', 'yellow', 'blue'];
    var ind = Math.floor(Math.random() * 4);
    var btnAdded = btnColors[ind];

    // Add the button to the pattern array then display pattern
    gamePattern.push(btnAdded);
    displayPattern();
}

// A timer for displayPattern()
const timer = ms => new Promise(res => setTimeout(res, ms));

// Displays the pattern after each completed round
async function displayPattern() {
    for (var i = 0; i < gamePattern.length; i++) {
        var curr = gamePattern[i];
        console.log(curr + " " + i);
        clickedBtn(curr);
        await timer(500);
    }
    patternPlaying = false;
}

// Highlights the button clicked and plays it's sound
function clickedBtn(color) {
    playSound(color);

    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 75);
}

// Plays the sound of the button clicked
function playSound(name) {
    var sound = new Audio("./assets/sounds/" + name + ".mp3");
    sound.play();
}