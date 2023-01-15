
function getWeatherFor(city,root,apikey){
    
    root.empty(); // clear div then dynamically generate new HTML below 

    // first fetch is for converting city to geo cordinates (lon, lat), so cords can be used in the next 2 fetches
    fetch("https://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid="+apikey).then((cities)=>cities.json()).then(function(cities){ 
    // second fetch retrives current weather
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+cities[0].lat+"&lon="+cities[0].lon+"&units=imperial&appid="+apikey).then((weather)=>weather.json()).then(function(weather){     
    // third fetch retrives forecast data in 3 hour increments for next 5 days
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+cities[0].lat +"&lon="+cities[0].lon+"&units=imperial&appid="+apikey).then((forecast)=>forecast.json()) .then(function(forecast){ 

            //console.log(weather); // data retrived from fetch
            //console.log(forecast);  
               
            // search history
            var history = JSON.parse(localStorage.getItem("history"));
            if (history == null) { history = { searches:[] }; }
            history.searches.splice(0,0,weather.name);
            if (history.searches.length > 5){ history.searches.length = 5;}
            localStorage.setItem("history",JSON.stringify(history));
            //console.log ( history);
            var searches = $("<section>").appendTo(root); 
            searches.css({"border-radius":"6px 6px 0px 0px"});
            for(var i=0;i<history.searches.length;i++){
                var buttontext = history.searches[i];   
                $("<button>").html(history.searches[i]).appendTo(searches).on("click",function(){ 
                    getWeatherFor($(this).text(),root,apikey)
                });
            }


            // current weather
            var cityname = $("<section>").appendTo(root); 
            cityname.css({"border-radius":"0px","background-color":"var(--color1)"});
            $("<h2>").text(weather.name).css({color:"var(--color2)"}).appendTo(cityname); 
            var current = $("<section>",{style: "border-radius:0px"}).appendTo(root);  
            $("<img>").attr("src","http://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png").appendTo(current); 
            $("<h3>").text("Date: " + new Date().toLocaleDateString()).appendTo(current); 
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

// load last city in local storage or load default city
var defaultcity = JSON.parse(localStorage.getItem("history"))
if (defaultcity==null) { defaultcity = "Salt Lake City"; } else { defaultcity = defaultcity.searches[0];}
getWeatherFor(defaultcity,$("#dynamic"),"b02be164d047cfbed86694527d1d3a92");

$("button").on("click",function() {
    getWeatherFor($("input").val(),$("#dynamic"),"b02be164d047cfbed86694527d1d3a92");
    console.log($("input").val());
  });
