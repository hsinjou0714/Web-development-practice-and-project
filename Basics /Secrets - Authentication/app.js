//jshint esversion:6
require('dotenv').config(); //it is emportant to use right on the top 
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrpt = require("mongoose-encryption")

console.log(process.env.API_KEY) //use dotenv env file as sample 

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true})

app.get("/",(req,res)=>{
    res.render("home")
});

app.get("/login",(req,res)=>{
    res.render("login")
});

app.get("/register",(req,res)=>{
    res.render("register")
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

//use secret key 
//const secret = "This is our secret" //moved it to env
//grab secret code from enviornment variable :   secret:process.env.SECRET
userSchema.plugin(encrpt,{secret:process.env.SECRET, encryptedFields:["password"]}); 
//plugin is a code that you can add to mongoose schema to extend function



app.post("/register",(req,res)=>{
    const newUser = new User({
        email: req.body.username,
        password: req.body.password,
    })
    newUser.save((err)=>{
        if(err){console.log(err)}else{
            res.render("secrets");
        }
    });
});




app.post("/login",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email:username}, function(err, foundUser){
        if(err){console.log(err)}else{
            if(foundUser){ //user exsit 
                if(foundUser.password == password){ 
                    console.log("password correct")
                    res.render("secrets"); }  //passworld correct 
            }
        }
    })

})


const User = new mongoose.model("User",userSchema);


app.listen(3000,()=>{console.log("listen to port 3000")})