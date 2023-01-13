
function getWeatherFor(city){
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=40.76&lon=-111.89&appid=b02be164d047cfbed86694527d1d3a92")
    .then((response) => response.json())
    .then((data) => console.log(data));
}

getWeatherFor();
  