$(document).keypress(function(e) {
    startGame(e);
});

function startGame(e) {
    var levelCount = 1;
    $("#level-title").text("Level " + levelCount);
    var queue = ['red', 'blue'];
    console.log(pickbtn(e));
    
    $(".btn").click(function (e) {
        var nextOrder = queue.shift()
        var clickedButton = btnClicked(e, levelCount);
        if (clickedButton === nextOrder) {
            console.log("AYAYAYAYAYYA");
        }
        levelCount += 1
        $("#level-title").text("Level " + levelCount);
    });
}

function pickbtn(e) {
    console.log(e)
    var btns = ['green', 'red', 'yellow', 'blue'];
    var ind = Math.floor(Math.random() * 4);
    return btns[ind];
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