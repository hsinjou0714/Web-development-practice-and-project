
//event output 
function Makesound(key){
    switch (key) {
        case "w":
            var audioCrash = new Audio("sounds/crash.mp3");
            audioCrash.play();
            break;
        case "a":
            var audioBass = new Audio("sounds/kick-bass.mp3");
            audioBass.play();
            break;
        case "s":
            var audioSnare = new Audio("sounds/snare.mp3");
            audioSnare.play();
            break;
        case "d":
            var audioTom1 = new Audio("sounds/tom-1.mp3");
            audioTom1.play();
            break;
        case "j":
            var audioTom2 = new Audio("sounds/tom-2.mp3");
            audioTom2.play();
            break;
        case "k":
            var audioTom3 = new Audio("sounds/tom-3.mp3");
            audioTom3.play();
            break;
        case "l":
            var audioTom4 = new Audio("sounds/tom-4.mp3");
            audioTom4.play();
            break;
        default:
            console.log("default triggered");
            break;
    }
}
//animation function 
function ButtonAnimation(key){
    document.querySelector("." + key).classList.add("pressed"); //give a new clas
    setTimeout( function(){
        document.querySelector("." + key).classList.remove("pressed"); //give a new clas
    }, 100)
}

//detecting buttom press

var buttomList = document.querySelectorAll(".drum")
for (var i = 0; i < buttomList.length; i++) {
    buttomList[i].addEventListener("click",
        function () {
            var buttonInnerHTML = this.innerHTML;
            console.log(buttonInnerHTML);
            Makesound(buttonInnerHTML);
            ButtonAnimation(buttonInnerHTML);
        }
    )
}

//detecting keyboard press
document.addEventListener("keydown", function(event){
    Makesound(event.key);
    ButtonAnimation(event.key);
})

