//jshint esversion:6
require('dotenv').config(); //it is emportant to use right on the top 
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
//cookie:
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


//console.log(process.env.API_KEY) //use dotenv env file as sample 

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({ //use the session, initialized 
    secret: "Our litte secret.",
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize()); //use passport and initialized 
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
//when serialise => create the cookie,
//when deserialise => crumble the cookie, and find what msg is inside
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
    res.render("home")
});

app.get("/login", (req, res) => {
    res.render("login")
});

app.get("/register", (req, res) => {
    res.render("register")
});


//use secret key 
//const secret = "This is our secret" //moved it to env
//grab secret code from enviornment variable :   secret:process.env.SECRET
//userSchema.plugin(encrpt,{secret:process.env.SECRET, encryptedFields:["password"]}); 
//plugin is a code that you can add to mongoose schema to extend function

app.get("/secrets", function (req, res) {
    //if the user is already login in
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("login");    //if not go to login page 
    }
})

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})

app.post("/register", (req, res) => {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        }
    })

});



app.post("/login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else { //successfully login 
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        }
    })
})





app.listen(3000, () => { console.log("listen to port 3000") })