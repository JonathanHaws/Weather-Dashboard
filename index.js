
function getOpenWeatherFor(city,root,apikey){
    // first fetch is for converting city to geo cordinates (lon, lat), so cords can be used in the next 2 fetches
    fetch("https://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid="+apikey).then((cities)=>cities.json()).then(function(cities){ 
    // second fetch retrives current weather
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+cities[0].lat+"&lon="+cities[0].lon+"&units=imperial&appid="+apikey).then((weather)=>weather.json()).then(function(weather){     
    // third fetch retrives forecast data in 3 hour increments for next 5 days
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+cities[0].lat +"&lon="+cities[0].lon+"&units=imperial&appid="+apikey).then((forecast)=>forecast.json()) .then(function(forecast){ 
            
            console.log(weather); // data retrived from fetch
            console.log(forecast);  

            // current weather
            var cityname = $("<section>").appendTo(root); 
            cityname.css({"border-radius":"6px 6px 0px 0px","background-color":"var(--color1)"});
            $("<h2>").text(weather.name).css({color:"var(--color2)"}).appendTo(cityname); 
            var current = $("<section>",{style: "border-radius:0px"}).appendTo(root);  
            $("<img>").attr("src","http://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png").appendTo(current); 
            $("<h3>").text(new Date().toLocaleDateString()).appendTo(current); 
            $("<h3>").text("Temprature: " + weather.main.temp + "°").appendTo(current); 
            $("<h3>").text("Wind Speed: " + weather.wind.speed + " MPH").appendTo(current); 
            $("<h3>").text("Humidity: " + weather.main.humidity + "%").appendTo(current);

            // forecast
            function createDay$(day){
                var div = $("<div>",{style: "background-color: var(--color2); padding:10px; border-radius:6px"});
                $("<img>").attr("src","http://openweathermap.org/img/wn/"+forecast.list[day].weather[0].icon+"@2x.png").appendTo(div); 
                $("<h3>").text(forecast.list[day].dt_txt.substr(5,6)).appendTo(div); 
                $("<h3>").text(forecast.list[day].main.temp + "°").appendTo(div); 
                $("<h3>").text(Math.trunc(forecast.list[day].wind.speed) + " MPH").appendTo(div); 
                $("<h3>").text(forecast.list[day].main.humidity + "%").appendTo(div); 
                return div;
            }
            var upcoming = $("<section>",{ width:"100px",style:"display:flex; justify-content:space-evenly; padding:10px 0px 10px 0px;"}).appendTo(root); 
            upcoming.css({"border-radius":"0px 0px 6px 6px","background-color":"var(--color1)"});
            createDay$(4).appendTo(upcoming);
            createDay$(12).appendTo(upcoming);
            createDay$(20).appendTo(upcoming);
            createDay$(28).appendTo(upcoming);
            createDay$(36).appendTo(upcoming);   

    })})}) // fetches are nested so code doesn't excecute until they are all complete
}

getOpenWeatherFor("Salt Lake City",$("#weather"),"b02be164d047cfbed86694527d1d3a92");



