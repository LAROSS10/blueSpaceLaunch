//queryURL details variables
var queryURL = "https://api.spacexdata.com/v3/launches/";
var standard = "next";

//selector variables
var $timerContainer = $(".timer");

//loaded details variables
var upcoming;
var details;
var launch_date_unix;

//current time variables
var currentEpoch = moment().format("X");

//initial call when page loads is the next lauch date by default


//function that will load an input launch
function loadInfo(launch){
    $.ajax({
    url: queryURL + standard,
    method: "GET"
    }).then(function(response){
        upcoming = response.upcoming;
        details = response.details;
        launch_date_unix = parseInt(response.launch_date_unix);

        //call the start timer function
    });
}

//start timer function will be called AFTER the server responds
function startTimer(start, end){
    $timerContainer.empty();
}