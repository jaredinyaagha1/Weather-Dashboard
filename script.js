var APIKey = "3be42a9dae422509e4fc0f4a269e4f20";
var cityUrl = "api.openweathermap.org/data/2.5/weather?q=" 

var searchBtn = $('#searchBtn');
var searchBar = $('#searchBar');
var historyBlocks = $('#historyBlocks')

$(document).ready();

function searchCity() {
    var input = searchBar.val();
    inputVal = JSON.stringify(input);
    localStorage.setItem(input, inputVal);
    if (input) {
        // console.log(input)
        // fetchCity(encodeURI(input));
        createHistoryBlocks(input);
    }
}

function fetchCity(input) {
    var url = cityUrl + input + "&appid=" + APIKey;

    fetch(url)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log("data")
                })
            }
        })

}

function createToday() {}

function createForecast() {}

function createHistoryBlocks(input) {
    var input = searchBar.val();
    var cityHistory = JSON.parse(localStorage.getItem(input));
    console.log(cityHistory);

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
searchBar.on("keydown", function(event) {
    if(event.key === 'Enter') {
        searchCity();
    }
});
