var randomNum_player_one = Math.floor(Math.random()*6) +1 ;
var randomNum_player_two = Math.floor(Math.random()*6) +1 ;
var image_tag_one = "images/dice" + randomNum_player_one + ".png";
var image_tag_two = "images/dice" + randomNum_player_two + ".png";
document.querySelector(".img1").setAttribute("src", image_tag_one);
document.querySelector(".img2").setAttribute("src", image_tag_two);

if(randomNum_player_one > randomNum_player_two ){
    document.querySelector("h1").textContent = "Play 1 Wins!"
}
else if(randomNum_player_one < randomNum_player_two ){
    document.querySelector("h1").textContent = "Play 2 Wins!"   
}
else{
    document.querySelector("h1").textContent = "Draw!"
}

