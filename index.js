
var apikey = "b02be164d047cfbed86694527d1d3a92";

function getWeatherFor(city){
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=40.76&lon=-111.89&appid=" + apikey)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

getWeatherFor();
  

function getLatAndLonFor(city){
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apikey)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

getLatAndLonFor("Provo");
