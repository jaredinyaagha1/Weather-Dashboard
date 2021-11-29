var APIKey = "3be42a9dae422509e4fc0f4a269e4f20";
var cityUrl = "https://api.openweathermap.org/data/2.5/weather?q=" 

var searchBtn = $("#searchBtn");
var searchBar = $("#searchBar");
var historyButtons = $("#historyBlocks");
var rightCol = $("#rightCol");
// var today = $('#today');
// var temp = $('#temp');
// var wind = $('wind');
// var humidity = $('humidity');
// var uvIndex = $('uvIndex');

$(document).ready();

function searchCity() {
    var input = searchBar.val();
    inputVal = JSON.stringify(input);
    
    if (input) {
        localStorage.setItem(input, inputVal);        
        // fetchCity(encodeURI(input));        
        allStorage();
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
                var kelvToFahr = Math.round((currentTemp - 273.15) * 9/5 + 32);
                console.log(kelvToFahr);
                createTodayBlock();
            })
}

function createTodayBlock() {
    rightCol.classList.toggle("visually-hidden");
}

function createForecastBlocks() {}

function allStorage() {
    var searchedCities = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    
    while (i--) {
        cityName = JSON.parse(localStorage.getItem(keys[i]));
        searchedCities.push(cityName);
        
    }
    console.log(searchedCities);
    createHistoryButtons(searchedCities)
}

function createHistoryButtons(input) {
    var input;
    Object.keys(input).forEach((key, index) => {
        var buttonText = input[index];
        var button = document.createElement("button");
        button.className = "p-2 btn btn-primary bg-secondary border-secondary";
        button.textContent = buttonText;
        historyButtons.append(button)


    })
    }
    // var input = searchBar.val();
    // var cityHistory = JSON.parse(localStorage.getItem(input));
    
    // if (input) {
    //     var cityEl = document.createElement("BUTTON");
    //     var historyNode = document.createTextNode(cityHistory);
    //     cityEl.appendChild(historyNode);
    //     cityEl.classList.add("p-2", "btn", "btn-primary", "bg-secondary", "border-secondary");
    //     historyBlocks.append(cityEl);
        
    // }

    // else {
    //     console.log("error");
    // };
        
// }

searchBtn.on("click", searchCity);
// searchBar.on("keydown", function(event) {
//     if(event.key === 'Enter') {
//         searchCity;
//     }
//     else{console.log("ayy")}
// });
