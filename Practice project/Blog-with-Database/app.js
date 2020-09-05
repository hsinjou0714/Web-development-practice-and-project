//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoos = require("mongoose");
const e = require("express");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoos.connect('mongodb://localhost:27017/PostDB', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoos.Schema({
  name: String,
  content: String,
});

const Post = mongoos.model("Post", postSchema);

//create default posts 
const homeStartingContent =  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."


const aboutContent = new Post({
  name: "aboutContent",
  content: "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
});

const contactContent = new Post({
  name: "contactContent",
  content: "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.",
});

const defaultPost = [ aboutContent, contactContent];
/*Post.insertMany(defaultPost,function(err){
  if(err){console.log(err);}
}); */


app.get("/", function (req, res) {


  Post.find({ $and: [{ name: { $ne: "aboutContent" } }, { name: { $ne: "contactContent" } },] }, function (err, docs) {
    if (!err) {
      const Userpost = docs;
      res.render("home", {
        startingContent: homeStartingContent,
        posts: Userpost
      });
    } else {
      console.log("home page find failed");
    }
  });

});



app.get("/about", function (req, res) {

  Post.findOne({ name: "aboutContent" }, function (err, doc) {
    if (!err) {
      console.log("successful");
      res.render("about", { aboutContent: doc.content });
    } else {
      console.log("can't find about content");
    }
  });
});

app.get("/contact", function (req, res) {

  Post.findOne({ name: "contactContent" }, function (err, doc) {
    if (!err) {
      res.render("contact", { contactContent: doc.content });
    }
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {

  const UserInput = new Post({
    name: req.body.postTitle,
    content: req.body.postBody
  });

  UserInput.save();
  res.redirect("/");

});

app.get("/posts/:postID", function (req, res) {
  const requestedID=   req.params.postID;
  console.log(requestedID);
  Post.findById(requestedID,function(err,doc){
    if(!err){
      res.render("post", {
        title: doc.name,
        content: doc.content
      });
    }else{ console.log(err)}
  })

  
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
