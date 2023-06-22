var gamePattern = [];
var roundPatternInd = 0;
var levelCount = 1;
var gameStarted = false;
var roundStarted = false;

$(document).keypress(function () {
    if (!gameStarted) startGame();
});

$(".btn").click(function (e) {
    if (!gameStarted || roundStarted) {
        return;
    }

    var nextOrder = gamePattern[roundPatternInd]
    var clickedButton = btnClicked(e);
    if (clickedButton !== nextOrder) {
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 250);

        roundPatternInd = 0;
        gameStarted = false;
        return;
    }

    roundPatternInd += 1;
    if (roundPatternInd === gamePattern.length) {
        roundStarted = true;
        setTimeout(function () {
            addBtnToPattern();
        }, 1000);

        roundPatternInd = 0;
        levelCount += 1;
        $("#level-title").text("Level " + levelCount);
    }
});

function startGame() {
    gameStarted = true;
    gamePattern = [];
    levelCount = 1;

    addBtnToPattern();
    $("#level-title").text("Level " + levelCount);
}

function addBtnToPattern() {
    var btnColors = ['green', 'red', 'yellow', 'blue'];
    var ind = Math.floor(Math.random() * 4);
    var btnAdded = btnColors[ind];
    
    gamePattern.push(btnAdded);
    displayPattern();
}

const timer = ms => new Promise(res => setTimeout(res, ms));

async function displayPattern() {
    for (var i = 0; i < gamePattern.length; i++) {
        var curr = gamePattern[i];
        console.log(curr + " " + i);
        playBtn(curr);
        await timer(500);
    }
    roundStarted = false;
}

function btnClicked(event) {
    var color = event.target.id;
    playBtn(color);
    return color;
}

function playBtn(color) {
    playSound(color);

    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 75);
}

function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}