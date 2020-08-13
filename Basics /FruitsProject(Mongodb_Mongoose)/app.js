const mongoose = require('mongoose');
const { GridFSBucketWriteStream } = require('mongodb');
//connect to fruits database, OPEN THE CONNECTION
mongoose.connect('mongodb://localhost:27017/fruitsDB', { useNewUrlParser: true, useUnifiedTopology: true });


//create a schema, in the schema you tell the structure of data 
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Specify the name of fruits"]
    },
    rating: {
        type: Number,
        min: [1, "min score is 1 max is 10"],
        max: [10, "min score is 1 max is 10"],
    },
    review: String,
});
//now use the schema to create a mongoose model
//we have a collection of "fruits", then inside here use "fruit". Mongoose will turn it into plurize form. 
//This will give you a collection of fruits, and fruits structure has to be the same as fruitschema
const Fruit = mongoose.model("Fruit", fruitSchema);
//create a document from the model which stick to the schema
const fruit = new Fruit({
    name: "Peach",
    rating: 9,
    review: "Sweet"
})


//fruit.save(); //save function in mongoose to save this documents into Fruits collection inside fruitdb
//comment out if you don't want it to be resaved evertime 

//name, age, model : john 37, save to database 
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema //tell mongoose that we are embedding a fruit document in person doc
    //this is an embedded documents
});

const Person = mongoose.model("person", personSchema); //behind the schene you get collection of people

const pineapple = new Fruit({
    name: "pineapple",
    rating: 5,
    review: "Am's favorite fruit"
});
//pineapple.save();
const cherry = new Fruit({
    name: "Cherry",
    rating: 9,
    review: "John's favorite fruit"
});
cherry.save();

const person = new Person({
    name: "Amy",
    age: 10,
    favoriteFruit: pineapple,
});
//person.save();

/*
const kiwi = new Fruit({
    name: "kiwi",
    rating: 10,
    review: "the best fruit",
});

const orange = new Fruit({
    name: "orange",
    rating: "5",
    review: "very sour"
});

const banana = new Fruit({
    name: "banana",
    rating: 2,
    review:"stinks",
});
*/

//to save it in bulk 
/*
Fruit.insertMany([kiwi, orange, banana], function(error){
    if(error){
        console.log(error);
    }else{
        console.log("successfully added all fruits to fruit db");
    }
});
*/
//comment out so it won't be rerun evertime 

//now that you can't update a field that doesn't exsit in schema
/*
Fruit.updateOne(
    { _id: "5f3465d0fb18d80a32a0f5c3" },
    { name: "grape" },
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("successfully updated the documents");
        }
    }
)

Fruit.deleteOne(
    {name:"grape"}, 
    function(err){
    if(err){
        console.log(err);
    }else{
        console.log("successfully deleted");
    }
});
*/
/*
Person.deleteMany(
    {name: "John"},
    function(err){
        if(err){
            console.log(err);
        }else{
            console.log("All John deleted")
        }
    }
);
*/


Person.updateOne(
    { name : "John" },
    { favoriteFruit: cherry },
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("All John updated ");
        }
    }
)


Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err);
    } else {
        fruits.forEach(function (fruit) {
            console.log(fruit.name)
        })

    }
    mongoose.connection.close(); //close the connection, remeber to close it evertime you close 
});