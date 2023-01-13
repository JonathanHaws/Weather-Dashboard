
function getWeatherFor(city,root){
    // first fetch is for converting city to geo cordinates (lon, lat)
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=b02be164d047cfbed86694527d1d3a92")
    .then((cities) => cities.json())
    .then(function(cities){ // cities is an ordered array with 0 being the best guess for the user requested city
        fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + cities[0].lat + "&lon=" + cities[0].lon + "&units=imperial&appid=b02be164d047cfbed86694527d1d3a92")
        .then((data) => data.json()) 
        .then(function(data){ // dynamically generate html with jquery based on weather data 
            
            console.log(data);
            
            var current = $("<section>",{ width: "max-content"}).appendTo(root); 
            $("<h2>").text(data.city.name).appendTo(current); 
            $("<h2>").text("Temprature: " + data.list[0].main.temp + "°").appendTo(current); 
            $("<h2>").text("Wind Speed: " + data.list[0].wind.speed + " MPH").appendTo(current); 
            $("<h2>").text("Humidity: " + data.list[0].main.humidity + " %").appendTo(current); 
      
        })
    })
}


getWeatherFor("Salt Lake City", $("#weather"));



