//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/TodolistDB", { useNewUrlParser: true, useUnifiedTopology: true });


const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  }
});

var Item = mongoose.model("Item", itemSchema);

//create default items for Item database 
const BuyFood = new Item({
  name: "Buy Food",
});
const CookFood = new Item({
  name: "Cook Food",
});
const EatFood = new Item({
  name: "Eat Food",
});
const defaultItems = [BuyFood, CookFood, EatFood];

const ListSchema = new mongoose.Schema({
  name: String,
  Items: [itemSchema], //an array of itemSchema
})

var List = mongoose.model("list", ListSchema);


app.get("/", function (req, res) {
  Item.find(function (err, foundItems) {
    if (foundItems.length === 0) { //insert the defalt item into the database, if there are currently no item 
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("successfully insert items to Items database");
        }
      })
      res.redirect("/"); //redirect back to root rout, there you can render 
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  })

});

//use express route parameters : https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
app.get("/:parameters", function (req, res) {
  const customListName = _.capitalize(req.params.parameters);

  List.findOne({ name: customListName }, function (err, foundList) { //find if the parameter is in the database list 
    
    if(!err){
      if(!foundList){
        const list = new List({ //create a new list
          name: customListName,
          Items: defaultItems
        })
        list.save(); //put it in database
        res.redirect("/" + customListName);
      }else{
        res.render("list", { listTitle: foundList.name, newListItems: foundList.Items }); //display
      }
    }
  });

})


app.post("/", function (req, res) {

  const itemName = req.body.newItem; //get the user input 
  const ListName = req.body.list;
  const userItem = new Item({ name: itemName }); //use item model and make mongodb db
  if (ListName == "Today") { //it is home route
    userItem.save(); //save it to db
    res.redirect("/"); //back to home root, and sent to user 
  } else { //not home route search the document, and add 
    List.findOne({ name: ListName }, function (err, foundList) {
      if (!err) {
        foundList.Items.push(userItem); //push the new created item to to the found list "items" db
        foundList.save();
        res.redirect("/" + ListName);
      }
    });
  }
});

app.post("/delete", function (req, res) {
  const checkItemId = req.body.checkbox;
  const ListName = req.body.listName;

  if (ListName == "Today") {
    Item.findByIdAndRemove( checkItemId , function (err) {
      if (!err) {
        console.log("successfully deleted");
        res.redirect("/");
      }
    });
  } else {
    //https://docs.mongodb.com/manual/reference/operator/update/pull/
    //findOneandUpdate
    List.findOneAndUpdate(
      { name: ListName }, //find one 
      { $pull: { Items: { _id: checkItemId } } }, //update,pull operatator from mongodb to delete element in array
      //pull from Item array, find the item in array through it's id
      function (err, foundList) {
        if (!err) {
          res.redirect("/" + ListName);
        }else{
          console.log(err);
        }
      });
  }
});




//about page 
app.get("/about", function (req, res) {
  res.render("about");
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
