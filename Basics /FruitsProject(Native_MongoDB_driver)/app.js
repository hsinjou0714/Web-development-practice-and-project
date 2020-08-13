
const { MongoClient } = require("mongodb"); 
const assert = require('assert');

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";
  //27017 is arbitary number, this connect to our db 

const dbName = "fruitsDB"; //databse name 
const client = new MongoClient(uri, { useUnifiedTopology: true }); //create a mongodb client 

client.connect(function(err){ //connect method to connect to the server 
    assert.equal(null,err);
    console.log("connected successfully to the server");
    const db = client.db(dbName);
    insertDocuments(db, function(){
        findDocuments(db, function(){
            client.close();
        });
    });
});

var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('fruits'); //this is equal to db.fruit.insert
    // Insert some documents
    collection.insertMany([ //here insert three item
      {name : "Apple", score :8, review: "Great fruit"}, 
      {name : "Orange", score :6, review: "Soar"}, 
      {name : "Banana", score :9, review: "Awesome"} 
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }

  var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('fruits');
    // Find some documents
    collection.find({}).toArray(function(err, fruits) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(fruits)
      callback(fruits);
    });
  }

  Fruit.find(function(err,fruits){
    if(err){
      console.log(err);
    }else{
      console.log(fruits);
    }
  })