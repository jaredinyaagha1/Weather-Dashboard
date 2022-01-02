var APIKey = "3be42a9dae422509e4fc0f4a269e4f20";
var coordUrl = "https://api.openweathermap.org/data/2.5/weather?q=" 
var cityInfoUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="

var searchBtn = $("#searchBtn");
var searchBar = $("#searchBar");
var historyButtons = $("#historyBlocks");
var rightCol = $("#rightCol");

var nameDate = $('#nameDate');
var icon0 = $('#icon0');
var temp0 = $('#temp0');
var wind0 = $('#wind0');
var humidity0 = $('#humidity0');
var uvIndex0 = $('#uvIndex0');

var fiveDayList = $('.fiveDay')
var histBtn = $('.histBtn');
var date0 = moment().format('L');

$(document).ready(function() {
//////SEARCH HANDLING
function searchCity() {
    initInput = searchBar.val(),
    inputVal = JSON.stringify(initInput);    
    if (initInput) {
        localStorage.setItem(initInput, inputVal);        
        fetchCoords(encodeURI(initInput));        
        storagetoButtons();
        
    }
}

// function handleSearchHistory(event) {
//     var button = event.target;
//     var city = button.getAttribute("value");
//     console.log(city);
//     fetchCoords(encodeURI(city));
// }
// 
// function searchHistory() {
//     var input = histBtn.val();
//     console.log(input);
//     if (input) {
//         fetchCoords(encodeURI(input));
//     }
//
// }
//////SEARCH HANDLING

//////API DATA CALL
function fetchCoords(input) {
    var requestUrl = coordUrl + input + "&appid=" + APIKey;
    fetch(requestUrl)
        .then(function(response) {            
            if (!response.ok) {
                throw response.json();
                }

                return response.json();
            })        
        .then(function (data) {
                // console.log(data);                
                var coordUrl = cityInfoUrl + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=hourly,minutely&appid=" + APIKey;
                dataName = data.name;
                // console.log(coordUrl);
                fetchCityInfo(coordUrl);
            })
        
}

function fetchCityInfo(input) {
    fetch(input)
        .then(function(response) {
            if (!response.ok) {
                throw response.json();
                }

                return response.json();
        })
        .then(function (data) {

                var fiveDayData = [data.daily];
                createBlocks(fiveDayData[0]);
        })
}
//////API CALL

//////BLOCK CREATION
function createBlocks(input) {
    rightCol.removeClass("d-none");
    
    var i = 0;
    for (var count = 0; count < 2; count++) {
        if (i == 0) {
            var iconcode = input[0].weather[0].icon,
            iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
            icon0.attr('src', iconURL);
            nameDate.html(JSON.parse(localStorage.getItem(initInput)));
            nameDate.append(" (" + date0 + ")");
            var currentTemp = Math.round((input[0].temp.day - 273.15) * 9/5 + 32);
            temp0.html("Temp: " + currentTemp + "°F");
            wind0.html("Wind: " + input[0].wind_speed + " MPH");
            humidity0.html("Humidity: " + input[0].humidity + " %");
            uvIndex0.html("UV Index: " + input[0].uvi);
            i = 1;
        }

        else if (i == 1) {
            
            var j = 0;
            
            fiveDayList.each(function(index) {                
                j++;
                // console.log($(this).attr("id"));
                var thisId = $(this).attr("id"),
                newDate = moment().add(thisId, 'days').format('L'),
                iconcode = input[thisId].weather[0].icon,
                iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png",
                thisIcon = $(this).children('li.icon').children('img'),
                thisTemp = $(this).children('li.temp'),
                currentTemp = Math.round((input[thisId].temp.day - 273.15) * 9/5 + 32),
                thisWind = $(this).children('li.wind'),
                thisHumidity = $(this).children('li.humidity');
                thisDate = $(this).children('li.date')
                
                thisDate.html(" (" + newDate + ")");
                thisIcon.attr('src', iconURL);
                thisTemp.html("Temp: " + currentTemp + "°F");
                thisWind.html("Wind: " + input[thisId].wind_speed + " MPH");
                thisHumidity.html("Humidity: " + input[thisId].humidity + " %")

                // console.log(thisId);
            });
        }
    }      
  
}
//////BLOCK CREATION

//////BUTTON CREATION
function storagetoButtons() {
    var searchedCities = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    
    while (i--) {
        cityName = JSON.parse(localStorage.getItem(keys[i]));
        searchedCities.push(cityName);
        
    }
    createHistoryButtons(searchedCities)    
}

function createHistoryButtons(input) {
    var input;
    historyButtons.empty();
    input.forEach((key, index) => {
        var buttonText = input[index];
        var button = document.createElement("button");
        button.className = "p-2 btn btn-primary bg-secondary border-secondary histBtn";
        button.setAttribute("value", buttonText);
        button.innerHTML = buttonText;
        historyButtons.append(button);
    })
    
}
//////BUTTON CREATION

//////EVENT HANDLERS
searchBtn.on("click", searchCity);
histBtn.on("click", function(event) {
    handleSearchHistory(event);
})
// searchBar.on("keydown", function(event) {
//     if(event.key === 'Enter') {
//         searchCity;
//     }
//     else{console.log("ayy")}
// });
   
//////EVENT HANDLERS
});


