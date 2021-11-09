// Variables
var searchBtn = document.querySelector("#searchBtn");
var apiKey = "d2e8aafe7d135c3adf2f2bacf7f90ca4";
var latitude = "";
var longitude = "";

// Search Button Listener
searchBtn.addEventListener("click", function(event) {
    var city = document.querySelector("#cityInput").value;

    getLatLong(city);
    currentWeather(city);
    //findWeather();
});


function currentWeather(city){
    
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude 
            + "&appid=" + apiKey;
    var currentDIV = document.querySelector("#todayForcast");
    var cityTitle = document.createElement("h2");
    var infoEl = document.createElement("p");
    var temp = document.createElement("ul");
    var wind = document.createElement("ul");
    var humidity = document.createElement("ul");
    var uvIndex = document.createElement("ul");

    console.log(latitude +" , "+longitude);
    console.log(currentWeatherURL);

    cityTitle.innerHTML = city + " (" + moment().format('MM/DD/YYYY') + ")";
    currentDIV.appendChild(cityTitle);

    console.log(cityTitle);

    fetch(currentWeatherURL)
        .then(function(response){
            if(response.ok){
                response.json().then(function (data){
                    console.log(data);
                    console.log(data['main']['temp']);

                    temp.innerHTML = "Temp: " + data['main']['temp'] + " F";//Degree sign?
                    infoEl.appendChild(temp);
                    wind.innerHTML = "Wind: " + data['wind']['speed'] + " MPH";
                    infoEl.appendChild(wind);
                    humidity.innerHTML = "Humidity: " + data['main']['humidity'] +"%";
                    infoEl.appendChild(humidity);
                    //uvIndex.innerHTML = "UV Index: " + data[]

                    //Puts infoEl in current Weather DIV
                    currentDIV.appendChild(infoEl);

                })
            }
            else{
                alert("Error: " + response.statusText);
            }
        })
}



function getLatLong(city){
    event.preventDefault();
    var geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;

    fetch(geocodingURL)
        .then(function(response){
            if(response.ok){
                response.json().then(function (data) {
                    latitude = data[0]['lat'];
                    longitude = data[0]['lon'];
                    console.log(latitude +" , "+longitude);
                });
            }
            else{
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error){
            alert("Unable to connect to get Lat/Long");
        })
}
