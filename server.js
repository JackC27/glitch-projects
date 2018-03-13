// server.js
// where your node app starts

// init project
var express = require('express');
var request = require('request');
var mongodb = require('mongodb');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/boise", function (req, resp) {
  var coffeecup = process.env.SECRET;
  var url= "http://api.wunderground.com/api/" +coffeecup + "/conditions/q/ID/Boise.json";
  var respBody;
  
  request(url, function(error, response, body) {
    respBody = body;
    resp.send(body);
  
  });
  
  //Build an object to send to mongo in order to be read and processed by D3/chartjs/chartist
  //so that we can display a small precipitation graph;
  // please checkout mlab for our sandbox db.
  //we also need to figure out the best way to add these objects to our db via node. here is the tutorial
  //https://github.com/mongolab/mongodb-driver-examples/blob/master/nodejs/nodeSimpleExample.js
  
  //LAST UPDATED 9 FEB 2016
  var weatherData = [
    {
      'time': new Date(),
      'weather-data': respBody
    }
  ];
  

});

app.get("/newport", function (req, resp) {
  var coffeecup = process.env.SECRET;
  var url= "http://api.wunderground.com/api/" +coffeecup + "/conditions/q/RI/Newport.json";

  request(url, function(error, response, body) {
    console.log(body);
    return body;
  });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
