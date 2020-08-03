const fs = require('fs'); //need this to use the file system module of nodes,  the module is called fs
fs.copyFileSync("file1.txt", "file2.txt"); // copy file one to file two 

//now superhero npm demo: 
var superheros = require("superheroes");
console.log(superheros.random());
//package file , jason is a file format to organize objects .

var supervillian = require("supervillains");
console.log(supervillian.random());