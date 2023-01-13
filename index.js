
function getWeatherFor(city){
    // first fetch is for converting city to geo cordinates (lon, lat)
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=b02be164d047cfbed86694527d1d3a92")
    .then((cities) => cities.json())
    .then(function(cities){ // cities is an ordered array with 0 being the best guess for the user requested city
        fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + cities[0].lat + "&lon=" + cities[0].lon + "&appid=b02be164d047cfbed86694527d1d3a92")
        .then((forecast) => forecast.json())
        .then(function(forecast){ 
            console.log(forecast);
        })
    })
}

getWeatherFor("Salt Lake City");



