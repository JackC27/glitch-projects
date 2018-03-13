// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

var place = ["/boise"];

function getBoise(city){
  console.log("heard getBoise");
  var weather = new XMLHttpRequest();
  weather.open("GET", city, true);
  weather.onreadystatechange = function(){
    if(weather.status === 200) {
      //console.log(weather.responseText);
      addImage(weather.responseText);
    }else{
      console.log(weather.readyState)
    }
  };
  weather.send();
};

function addImage(boiseWeatherJSON){
  var boiseImage = document.getElementById("boiseIMG");
  console.log(boiseWeatherJSON);
  var x = boiseWeatherJSON;
  var y = JSON.parse(x).current_observation;
  boiseImage.src = y.icon_url;
  var boisePercip = document.getElementById("percip");
  boisePercip.textContent = y.precip_today_in;
  var boisePercip = document.getElementById("percip1hr");
  boisePercip.textContent = y.precip_1hr_in;
  var boiseTemp = document.getElementById('temp');
  boiseTemp.textContent = y.feelslike_string;
}

getBoise(place[0]);

