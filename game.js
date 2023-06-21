var gamePattern = [];
var roundPatternInd = 0;
var levelCount = 1;
var gameStarted = false;

$(document).keypress(function (e) {
    if (!gameStarted) startGame(e);
});

function startGame(e) {
    gameStarted = true;
    gamePattern = [];
    levelCount = 1;
    addBtnToPattern();
    $("#level-title").text("Level " + levelCount);
}

$(".btn").click(function (e) {
    if (!gameStarted) {
        return;
    }

    var nextOrder = gamePattern[roundPatternInd]
    var clickedButton = btnClicked(e);
    if (clickedButton !== nextOrder) {
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 250);
        roundPatternInd = 0;
        gameStarted = false;
        return;
    }

    roundPatternInd += 1;
    if (roundPatternInd === gamePattern.length) {
        setTimeout(function () {
            addBtnToPattern();
        }, 1000);
        roundPatternInd = 0;
        levelCount += 1;
        $("#level-title").text("Level " + levelCount);
    }
});

function addBtnToPattern() {
    var btnColors = ['green', 'red', 'yellow', 'blue'];
    var ind = Math.floor(Math.random() * 4);
    var btnAdded = btnColors[ind];
    playSound(btnAdded);

    $("#" + btnAdded).addClass("pressed");
    setTimeout(function () {
        $("#" + btnAdded).removeClass("pressed");
    }, 75);
    gamePattern.push(btnAdded);
    console.log(gamePattern);
}

function btnClicked(e) {
    var color = e.target.id;
    var idBtnPressed = "#" + color;
    playSound(color);
    $(idBtnPressed).addClass("pressed");
    setTimeout(function () {
        $(idBtnPressed).removeClass("pressed");
    }, 75);
    return e.target.id;
}

function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}