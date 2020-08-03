//global attribute 
var Sounds = []; // array list for music orders 
var buttomId = ["green", "red", "yellow", "blue"];
var userInputList = [];
var level = 0;
var startGame = false;

/** Now the actual gaming part **/

//ask user to start game
$(document).keypress(function (event) {
    if (!startGame) {
        NextSequence();
        MakeSound(Sounds[0]);
        startGame = true
    }
});


//get user input and match sounds with input 
$(".btn").on("click", function () {

    var userInput = $(this).attr('id');
    userInputList.push(userInput);
    animatePress(userInput);
    MakeSound(userInput); //make the correct sound 
    arrayEquals(userInputList.length - 1);
})



//function to make sound
function MakeSound(key) {
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();

}
//function to change css buttom theme 
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

//function to check if user input and game(sounds) list are the same 
function arrayEquals(currlevel) {
    if (userInputList[currlevel] == Sounds[currlevel]) {
        console.log("success");
        if (userInputList.length == Sounds.length) {
            setTimeout(function () {
                NextSequence(); //add another element to list 
            }, 1000
            );
        }
    }
    else {
        console.log("wrong");
        GameOver();
    }

}


//gaming sequence (the music sequence)
function NextSequence() {
    userInputList = [];
    ranSound = buttomId[Math.floor(Math.random() * 4)]; //get a random sound
    console.log("ranSound : " + ranSound);
    Sounds.push(ranSound);
    $("#" + ranSound).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    level++;
    $("h1").text("Level : " + level);
}

//game over function 
function GameOver() {
    MakeSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");

    startGame = false;
    Sounds = [];
    userInputList = [];
    level = 0;
}

