var APIKey = "3be42a9dae422509e4fc0f4a269e4f20";
var cityUrl = "api.openweathermap.org/data/2.5/weather?q=" 

var searchBtn = $('#searchBtn');
var searchBar = $('#searchBar');

$(document).ready();

function searchCity() {
    var input = searchBar.val();

    if (input) {
        // console.log(input)
        fetchCity(encodeURI(input));
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


searchBtn.on("click", searchCity);
searchBar.on("keydown", function(event) {
    if(event.key === 'Enter') {
        searchCity();
    }
});