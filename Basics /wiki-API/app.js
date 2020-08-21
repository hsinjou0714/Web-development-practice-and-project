const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});


const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.static("public"));

const articleSchema = new mongoose.Schema({
    title:String,
    content:String,  
});

var Article = mongoose.model("Article",articleSchema);

/////////////////////////////Request target All article //////////////////////
//chain all the method to route
app.route("/articles")

.get((req,res)=>{ //get method 
    Article.find(function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        }else{
            console.log(err);
        }
    })
    
})

.post((req,res)=>{ //post method 
    console.log(req.body.title);
    console.log(req.body.content);

    //store mongoDB
    const newArticle = new Article({
        title:req.body.title,
        content: req.body.content,
    });
    newArticle.save();
})

.delete((req,res)=> { //delete method 
    Article.deleteMany(function(err){
        if(!err){
            res.send("successfully deleted all articles ");
        }else{
            res.send(err);
        }
    });
}); 

/*
//Get RestfulAPI
app.get('/articles',(req,res)=>{
    Article.find(function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        }else{
            console.log(err);
        }
    })
    
});



//Post RestAPI
app.post("/articles",(req,res)=>{
    console.log(req.body.title);
    console.log(req.body.content);

    //store mongoDB
    const newArticle = new Article({
        title:req.body.title,
        content: req.body.content,
    });
    newArticle.save();
});


//delete RestAPI 
app.delete("/articles", (req,res)=> {
    Article.deleteMany(function(err){
        if(!err){
            res.send("successfully deleted all articles ");
        }else{
            res.send(err);
        }
    });
});
*/
/////////////////////////////Request target specefic article ////////////////
app.route("/articles/:articleTitle")

.get((req,res)=> {
    console.log(req.params.articleTitle);
    Article.findOne({title:req.params.articleTitle },function(err,founddoc){
        if(founddoc){
            res.send(founddoc);
        }else{
            res.send("No article with that title was found");
        }
    })
})
//PUT, updating database with by sending an entire new entry to replace the previous one 
.put((req,res)=>{
    Article.update(
        {title:req.params.articleTitle },
        {title:req.body.title, content:req.body.content},
        {overwrite:true},
        function(err){
            if(!err){ res.send("updates")}
        }
    )
})

.patch((req,res)=> {
    Article.update(
        {title:req.params.articleTitle },
        {$set: req.body },
        function(err){if(!err){res.send("successfully updated")}}
    )
})

.delete((req,res)=>{
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err){
            if(err){console.log(err)}
            else{res.send("successfult deleted")}
        })
});

app.listen(3000, ()=>{
    console.log("listen to port 3000");
})


