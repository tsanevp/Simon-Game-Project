var gamePattern = [];
var roundPatternInd = 0;
var levelCount = 1;
var gameInProgress = false;
var roundInProgress = false;

$(document).keypress(function(e) {
    if (!gameInProgress) {
        startGame(e);
        gameInProgress = true;
    }
});

function startGame(e) {
    $("#level-title").text("Level " + levelCount);
    gamePattern = [];
    levelCount = 1;
    addBtnToPattern();
    console.log(gamePattern);
}

function currentRound(queue, levelCount) {

}

$(".btn").click(function (e) {
    var nextOrder = gamePattern[roundPatternInd]
    var clickedButton = btnClicked(e, levelCount);
    if (clickedButton === nextOrder) {
        roundPatternInd += 1;
        levelCount += 1;
        addBtnToPattern();
        $("#level-title").text("Level " + levelCount);
    } else {
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 250);
        roundPatternInd = 0;
        gameInProgress = false; 
    }
});

function addBtnToPattern() {
    var btnColors = ['green', 'red', 'yellow', 'blue'];
    var ind = Math.floor(Math.random() * 4);
    var btnAdded = btnColors[ind];
    $("#" + btnAdded).addClass("pressed");
    setTimeout(function() {
        $("#" + btnAdded).removeClass("pressed");
    }, 75);
    gamePattern.push(btnAdded);
    console.log(gamePattern);
}

function btnClicked(e, count) {
    var idBtnPressed = "#" + e.target.id;
    $(idBtnPressed).addClass("pressed");
    setTimeout(function() {
        $(idBtnPressed).removeClass("pressed");
    }, 75);
    return e.target.id;
}


// need a way to keep track of the current level (increment the level if a successful click has been made)

// need a way to highlight the new square randomly each round

// need a way to verify the squares clicked are in the correct order