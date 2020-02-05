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
        startTimer(currentEpoch, launch_date_unix);
    });
}

//start timer function will be called AFTER the server responds
function startTimer(currentTime, launchTime){
    $timerContainer.empty();
    //initialize # of seconds left for the timer
    var secondsLeft = launchTime - currentTime;
    
    //calculate number of days
    var daysLeft = Math.floor(secondsLeft/86400);
    secondsLeft = calculateDays(secondsLeft);

    //calculate number of hours
    var hoursLeft = Math.floor(secondsLeft/3600);
    secondsLeft = calculateHours(secondsLeft);

    //calculate the number of minutes left
    var minutesLeft = Math.floor(secondsLeft/60);
    secondsLeft = calculateMinutes(secondsLeft);

    interval = setInterval(function(){
        secondsLeft--;
        if(secondsLeft<0){
            minutesLeft--;
            secondsLeft = 60;
        }
        console.log("Days: "+daysLeft);
        console.log("Hours: "+hoursLeft);
        console.log("Minutes: "+minutesLeft);
        console.log("Seconds: "+secondsLeft);
    }, 1000);
}

function calculateDays(seconds){
    return seconds % 86400;
}

function calculateHours(seconds){
    return seconds % 3600;
}

function calculateMinutes(seconds){
    return seconds % 60;
}

loadInfo(standard);