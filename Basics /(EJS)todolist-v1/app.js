const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js"); //require date module, at date.js
console.log(date); //so whatever is exported will be console logged

const app = express();


let items = ["Buy food", "eat food", "cook food"]; //when post is made, item will be replaced to the value  
let workitem = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); //set up body parser
app.use(express.static("public")); //tell the location of static file, and tell it to use it. Here the public file has css 

app.get("/", function (req, res) {

    let day = date.getDate(); //call the function that's bound to date.js
    res.render('list', { ListTitle: day, newListItems: items });
    //express will look into the folder in views and look into file call list.ejs, pass the varaible 
    //the key here is "kindOfDay"
    //if you eant to render, needs to provide all the variable 
});


app.post("/", function (req, res) { //handle to post request

    let item = req.body.userAddList; //use the name of new item
    console.log(req.body);
    if (req.body.ItemAddbutton === "work") { //if the list we are working on is work
        workitem.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

});

//for work page 
app.get("/work", function (req, res) {
    res.render("list", { ListTitle: "work", newListItems: workitem });
}); //target the work route 

app.get("/about", function (req, res) {
    res.render("about");
});


app.listen(3000, function () {
    console.log("server started on port 3000");
});