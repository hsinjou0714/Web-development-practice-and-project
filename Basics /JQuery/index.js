//$ is jQuery, use it to select hi (like query selector)
//$("h1").css("color","red"); 
console.log($("h1").css("font-size"));
$("h1").addClass("big-title margin-50");
$("h1").text("bye") //this will change the h1 text
//$("h1").removeClass("big-title");
//document.querySelectorAll("button")
$("button").html("<em>Hey</em>") //change the html tags

//selecting the attribute 
console.log($('img').attr("src"))
//set the attribute, add a second argument 
$("a").attr("href", "https://mail.google.com/mail/u/2/?tab=wm&ogbl#inbox")
//can also do it to get class
$("h1").attr("class");

//add event listener, example 
$("h1").click(function () {
    $("h1").css("color", "purple");
})

//normal javascript change color 
//for (var i = 0 ; i < 5 ; i ++ ){
//    document.querySelectorAll("button")[i].addEventListener("click",function(){
//        document.querySelector("h1").style.color = "purple";
//    })
//}


//with Jquery, by selecting button, jquery will look through all the buttons 
$("button").click(function () {
    $("h1").css("color", "purple");
})

$("input").keypress(function (event) {
    $("h1").text(event.key);
});

//the method "on" for event listener => takes two parameters, the first one is the "event", adn second is function
$("h1").on("mouseover", function () {
    $("h1").css("color", "yellow");
})

//add element 
$("h1").before("<button>before</button>");
$("h1").after("<button>after</button>");
$("h1").prepend("<button>prepend</button>"); //add into the item just after the opeening tag 
$("h1").append("<button>append</button>"); //add into the item just after the opeening tag 


//jquery animation
$("button").on("click", function () {
    $("h1").hidden();
    $("h1").toggle(); //just disapear 
    $("h1").fadeOut(); //allow more progressive movement,opposite is fade in 
    $("h1").fadeToggle();
    $("h1").slideUp();
    $("h1").slideToggle();
    $("h1").animate({   //use css to build a animation 
        opacity: 0.5    //you can't change the color, has to be a numeric value 
    })
    //you can chain the animations 
    $("h1").slideUp().slideDown().animate({
        opacity: 0.5,

    })
})

