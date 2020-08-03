const expres = require("express");
const app = expres(); //refer to express module and function, always use name "app"

//to the home page 
app.get("/", function(request, response ){
    console.log(request); //so the request tells you of the clinent 
    response.send("<h1>Hello</h1>") //when the request get made, send a response from server 
    //usually show it in req for request and res for response 
    
} ) //what it will do when someone make a get request to the home root

//we can response to a different route, to the contact page 
app.get("/contact" , function(req, res){
    res.send("contact me at : christine Yang.com ")
})

//about page 
app.get("/about", function(req,res){
    res.send("This is Christine from UBC learning web development")
})

app.get("/hobbies", function(req,res){
    res.send("My hobby is workout")
})

app.listen(3000, function  (){
    console.log("server started on port 3000"); // a callback function 
}); //listen to specific port 3000
//