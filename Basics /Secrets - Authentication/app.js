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
//login with google: OAuth 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const findOrCreate = require('mongoose-findorcreate')



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
    googleId:String,
    secret:String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
//when serialise => create the cookie,
//when deserialise => crumble the cookie, and find what msg is inside
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use(new GoogleStrategy({
    clientID: process.env.CLINET_ID,
    clientSecret: process.env.CLINET_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));


app.get("/", (req, res) => {
    res.render("home")
});

app.get("/auth/google",
    //use passport to authenticate user with google strategy 
    //we want user profile. 
    passport.authenticate("google", { scope: ["profile"] })
)

app.get("/auth/google/secrets",
    passport.authenticate('google', { failureRedirect: '/login' }), //if authentication faile, redirect to login route 
    function (req, res) {
        //if successful give them access to secret 
        res.redirect("/secrets");
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
    //find all the secrets field, and find all the not null 
    User.find({"secret":{$ne:null}},function(err,foundUsers){
        if(!err){
            res.render("secrets",{userWithSecrets:foundUsers})
        }
    });
});


app.get("/submit",(req,res)=>{
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("login");    //if not go to login page 
    }
});


app.post("/submit",(req,res)=>{
    const submitSecret = req.body.secret
    const userId = req.user._id
    User.findById(userId, function(err,foundUser){
        if(err){console.log(err)}else{ //find the user by ID 
            foundUser.secret = submitSecret;
            foundUser.save(function(){ //save the secret 
                res.redirect("/secrets"); //redirect to the secret page and show 
            });
        }
    })
})

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

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