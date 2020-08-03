const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true})) //let express use the body parser, here we use the urlencoded format 
//urlencoded allow you to use it in the html form 
//extended : true allow us to post nested object

app.get('/', function (req, res) { //get the input at root "/"
    res.sendFile(__dirname  + "/index.html");
   // __dirname: current file,  and add yout path
})

app.get('/BMICalculator.html', function(req, res){
    res.sendFile(__dirname + '/BMICalculator.html');
})

//a post method to handle post request 
app.post("/", function(req, res){
    console.log(req.body);
    var num1 = Number(req.body.num1); //num1 is the name attribute from our html file 
    var num2 = Number(req.body.num2);
    var result =  num1 + num2; 
    res.send("Thanks for your input, the result of the calculation : " + result);

    var w = Number(req.body.w);
    var h = Number(req.body.h);
    BMIResult = w/(h^2);
    res.send("Thank you for your input, the result is " + BMIResult);
})

app.post("/BMICalculator.html", function(req, res){
    var w = parseFloat(req.body.w);
    var h = parseFloat(req.body.h);
    BMIResult = w/(h*h);
    res.send("Thank you for your input, the result is " + BMIResult);
})

app.listen(3000, function(){
    console.log("Server is running on port 3000")
})
