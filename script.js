var APIKey = "3be42a9dae422509e4fc0f4a269e4f20";
var cityUrl = "https://api.openweathermap.org/data/2.5/weather?q=" 

var searchBtn = $('#searchBtn');
var searchBar = $('#searchBar');
var historyBlocks = $('#historyBlocks');
var today = $('#today');
var temp = $('#temp');
var wind = $('wind');
var humidity = $('humidity');
var uvIndex = $('uvIndex');

// function TodayBlock(todayName, todayTemp, todayWind, todayHum, todayUV) {
//     this.
// }
$(document).ready();

function searchCity() {
    var input = searchBar.val();
    inputVal = JSON.stringify(input);
    localStorage.setItem(input, inputVal);
    if (input) {
        // console.log(input)
        fetchCity(encodeURI(input));
        createHistoryBlocks(input);
    }
}

function fetchCity(input) {
    var requestUrl = cityUrl + input + "&appid=" + APIKey;
    console.log(requestUrl);
    fetch(requestUrl)
        .then(function(response) {            
            if (!response.ok) {
                throw response.json();
                }

                return response.json();
            })        
        .then(function (data) {
                console.log(data)
                var currentTemp = data.main.temp;
                var kelvToFahr = Math.round((currentTemp - 273.15) * 9/5 + 32)
                console.log(kelvToFahr)
            })
}

function createTodayBlock () {}

function createForecastBlocks() {}

function createHistoryBlocks(input) {
    var input = searchBar.val();
    var cityHistory = JSON.parse(localStorage.getItem(input));
    
    if (input) {
        var cityEl = document.createElement("BUTTON");
        var historyNode = document.createTextNode(cityHistory);
        cityEl.appendChild(historyNode);
        cityEl.classList.add("p-2", "btn", "btn-primary", "bg-secondary", "border-secondary");
        historyBlocks.append(cityEl);
        
    }

    else {
        console.log("error");
    };
        
}

searchBtn.on("click", searchCity);
// searchBar.on("keydown", function(event) {
//     if(event.key === 'Enter') {
//         searchCity;
//     }
//     else{console.log("ayy")}
// });
