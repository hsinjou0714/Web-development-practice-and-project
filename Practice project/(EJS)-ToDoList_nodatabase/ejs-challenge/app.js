//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash"); //https://lodash.com/
const ejs = require("ejs");

let postLists = [];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //use the static file for css 


app.get("/", function (req, res) { //at home page 
  res.render('home', { InnerText: homeStartingContent, postLists: postLists });
  console.log(postLists);
});

app.get("/about", function (req, res) { //at about pade 
  res.render('about', { InnerText: aboutContent });
});

app.get("/contact", function (req, res) { //at contact page 
  res.render('contact', { InnerText: contactContent })
});

app.get("/compose", function (req, res) { //at compose page 
  res.render('compose')
});

app.get("/posts/:userPage", function(req,res){ //route parameter to access the user input page, now a dynamic url
  let userPage = _.lowerCase(req.params.userPage); //_.lowerCase is a loaddash method to make it lowercase https://lodash.com/docs/4.17.15#lowerCase
  console.log(userPage );
  if( postLists.find(element => _.lowerCase(element.title) == userPage) ){ //find an element in object list 
    console.log("match");
  }else{
    console.log("item not in list");
  }
  
});

app.post("/compose", function (req, res) { //user make input
  const newPost = {
    title: req.body.TitleInput,
    content: req.body.ComposeInput,
  }

  postLists.push(newPost);
  res.redirect('/');

});







app.listen(3000, function () {
  console.log("Server started on port 3000");
});
