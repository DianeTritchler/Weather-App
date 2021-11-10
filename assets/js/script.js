// Variables
var searchBtn = document.querySelector("#searchBtn");
var clevelandBtn = document.querySelector("#clevelandBtn");
var sanAntonioBtn = document.querySelector("#sanAntonioBtn");
var austinBtn = document.querySelector("#austinBtn");
var chicagoBtn = document.querySelector("#chicagoBtn");
var forcastDIV = document.querySelector("#fiveDayForcast");
var currentDIV = document.querySelector("#todayForcast");
var apiKey = "d2e8aafe7d135c3adf2f2bacf7f90ca4";
var latitude = "";
var longitude = "";

// Search Button Listener
searchBtn.addEventListener("click", function() {
    var city = document.querySelector("#cityInput").value;
    
    while(forcastDIV.firstChild){
        forcastDIV.removeChild(forcastDIV.firstChild);

    }
    
    while(currentDIV.firstChild){
        currentDIV.removeChild(currentDIV.firstChild);
    }
    
    getLatLong(city);
});

clevelandBtn.addEventListener("click", function(){

    while(forcastDIV.firstChild){
        forcastDIV.removeChild(forcastDIV.firstChild);

    }
    
    while(currentDIV.firstChild){
        currentDIV.removeChild(currentDIV.firstChild);
    }

    var city = "Cleveland";
    getLatLong(city);
});

sanAntonioBtn.addEventListener("click", function(){

    while(forcastDIV.firstChild){
        forcastDIV.removeChild(forcastDIV.firstChild);

    }
    
    while(currentDIV.firstChild){
        currentDIV.removeChild(currentDIV.firstChild);
    }

    var city = "San Antonio";
    getLatLong(city);
});

austinBtn.addEventListener("click", function(){

    while(forcastDIV.firstChild){
        forcastDIV.removeChild(forcastDIV.firstChild);

    }
    
    while(currentDIV.firstChild){
        currentDIV.removeChild(currentDIV.firstChild);
    }

    var city = "Austin";
    getLatLong(city);
});

chicagoBtn.addEventListener("click", function(){

    while(forcastDIV.firstChild){
        forcastDIV.removeChild(forcastDIV.firstChild);

    }
    
    while(currentDIV.firstChild){
        currentDIV.removeChild(currentDIV.firstChild);
    }
    
    var city = "Chicago";
    getLatLong(city);
});


function currentWeather(city){
    
    var currentWeatherURL = "http://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude 
            + "&units=imperial&appid=" + apiKey;
     
    var cityTitle = document.createElement("h2");
    var infoEl = document.createElement("p");
    var temp = document.createElement("p");
    var wind = document.createElement("p");
    var humidity = document.createElement("p");
    var uvIndex = document.createElement("p");
    var icon = document.createElement('img');

    

    cityTitle.innerHTML = city + " (" + moment().format('MM/DD/YYYY') + ")";
    currentDIV.appendChild(cityTitle);

    fetch(currentWeatherURL)
        .then(function(response){
            if(response.ok){
                response.json().then(function (data){
                    console.log(data);

                    var holderID = data['current']['weather']['0']['id'];
                    var iconID = weatherID[holderID];
                    var src = "http://openweathermap.org/img/wn/" + iconID + "d@2x.png";
                    icon.src = src;

                    infoEl.appendChild(icon);

                    temp.innerHTML = "Temp: " + data['current']['temp'] + " F";//Degree sign?
                    infoEl.appendChild(temp);
                    wind.innerHTML = "Wind: " + data['current']['wind_speed'] + " MPH";
                    infoEl.appendChild(wind);
                    humidity.innerHTML = "Humidity: " + data['current']['humidity'] +"%";
                    infoEl.appendChild(humidity);
                    uvIndex.innerHTML = "UV Index: " + data['current']['uvi'];
                    

                    if(data['current']['uvi']<2){
                        uvIndex.style.background = "#75e081";
                    }
                    else if (data['current']['uvi']<7) {
                        uvIndex.style.background = "#faff75";
                    } 
                    else if(data['current']['uvi']>7){
                        uvIndex.style.background = "#e62525";
                    }

                    infoEl.appendChild(uvIndex);

                    //Puts infoEl in current Weather DIV
                    currentDIV.appendChild(infoEl);

                    forcast(data);
                })
            }
            else{
                alert("Error: " + response.statusText);
            }
        })
}

function forcast(data){
    var date = moment().format('MM/DD/YYYY');
    
    

    for(var i = 0; i < 5; i++){
        var infoEl = document.createElement('div');
        infoEl.setAttribute("id", "forcastDIV");
        var temp = document.createElement('p');
        var wind = document.createElement('p');
        var humidity = document.createElement('p');
        var formatedDate = document.createElement('p');
        var icon = document.createElement('img');

        date = moment().add( (i+1) , 'days');
        formatedDate.innerText = date.format('MM') + "/" + date.format('DD') + "/" + date.format('YYYY');

        infoEl.appendChild(formatedDate);

        var holderID = data['daily'][i]['weather']['0']['id'];
        var iconID = weatherID[holderID];
        var src = "http://openweathermap.org/img/wn/" + iconID + "d@2x.png";
        icon.src = src;

        infoEl.appendChild(icon);

        temp.innerText = "Temp: " + data['daily'][i]['temp']['day'] + " F"; //Degree Symbol
        infoEl.appendChild(temp);
        wind.innerText = "Wind: " + data['daily'][i]['wind_speed'] + "MPH";
        infoEl.appendChild(wind);
        humidity.innerText = "Humidity: " + data['daily'][i]['humidity'] + "%";
        infoEl.appendChild(humidity);

        forcastDIV.appendChild(infoEl);
        

    }
    

}


function getLatLong(city){
    
    var geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;

    fetch(geocodingURL)
        .then(function(response){
            if(response.ok){
                response.json().then(function (data) {
                    latitude = data[0]['lat'];
                    longitude = data[0]['lon'];
                    currentWeather(city);
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

let weatherID = {
    200: "11",
    201: "11",
    202: "11",
    210: "11",
    211: "11",
    212: "11",
    221: "11",
    230: "11",
    231: "11",
    232: "11",
    300: "09",
    301: "09",
    302: "09",
    310: "09",
    311: "09",
    312: "09", 
    313: "09",
    314: "09",
    321: "09",
    500: "10",
    501: "10",
    502: "10",
    503: "10",
    504: "10", 
    511: "13",
    520: "09",
    521: "09",
    522: "09",
    531: "09",
    600: "13",
    601: "13",
    602: "13",
    611: "13",
    612: "13",
    613: "13",
    615: "13",
    616: "13",
    620: "13",
    621: "13",
    622: "13",
    701: "50",
    711: "50",
    721: "50",
    731: "50",
    741: "50",
    751: "50",
    761: "50", 
    762: "50",
    771: "50",
    781: "50",
    800: "01",
    801: "02",
    802: "03",
    803: "04",
    804: "04"
}

