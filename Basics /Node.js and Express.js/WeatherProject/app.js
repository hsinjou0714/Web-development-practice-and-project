const express = require('express');
const https = require('https'); //no need to install, it's a native node module
//perform npm i body-parser to get the text from user
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}))

app.get("/", function(req, res) { //client get our data
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
  const query = req.body.cityName //from bodyParser
  const appId = "439d4b804bc8187953eb36d2a8c26a02";
  //get the url through Postman
  const url = "https://openweathermap.org/data/2.5/find?q="+ query +"&nits=metric&appid=" + appId
  console.log(query);
  console.log(url);
  https.get(url, function(HttpRes) { //we get otherpeople server
    console.log(HttpRes.statusCode); //get the statusCode variable, 200 is successful
    // the on method,can be used to search through some data
    HttpRes.on('data', (data) => {
      //console.log("original output : " + data); //give a hexadecimal output
      const weatherData = JSON.parse(data); //parse it to javascript object
      console.log(weatherData);
      //we can also add a object
      const temp = weatherData.list[0].main.temp
      const description =  weatherData.list[0].weather[0].description
      const icon = weatherData.list[0].weather[0].icon
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently "+ description + "</p>");
      res.write("<h1> The temperature in " + query + " is  " + temp + "degree celcius</h1>");
      res.write("<img src = "+ iconURL +">");
      res.send();

        const obj = {
        name: "Angela",
        favoriteFood: "Ramen",
      }
      console.log("turn js to String ; " + JSON.stringify(obj));

    });
  })


})




app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
