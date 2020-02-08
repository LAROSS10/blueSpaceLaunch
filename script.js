//queryURL details variables
var queryURL = "https://api.spacexdata.com/v3/launches/";
var standard = "next";
//nasa api key https://api.nasa.gov/planetary/apod?api_key=X261UHeXDNMWRswxYE5ZSLUr2B2Uxhf5sFRkLhxH&hd=true

//selector variables
var $timerContainer = $(".timer");

//loaded details variables
var upcoming;
var details;
var launch_date_unix;

//current time variables
var currentEpoch = moment().format("X");

//function that will load an input launch
function loadInfo(launch){
    $.ajax({
    url: queryURL + launch,
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
    //initialize # of seconds left for the timer
    var secondsLeft = launchTime - currentTime;
    var down = true;

    //if the secondsleft is negative, flip it to positive and flip down to false to count up
    if(secondsLeft < 0){
        down = false;
        secondsLeft *= -1;
    }

    //calculate number of days
    var daysLeft = Math.floor(secondsLeft/86400);
    secondsLeft = calculateDays(secondsLeft);

    //calculate number of hours
    var hoursLeft = Math.floor(secondsLeft/3600);
    secondsLeft = calculateHours(secondsLeft);

    //calculate the number of minutes left
    var minutesLeft = Math.floor(secondsLeft/60);
    secondsLeft = calculateMinutes(secondsLeft);

    //call the countdown function if the down boolean is true, else count up for a launch that already happended
    if(down === true){countDown(secondsLeft, minutesLeft, hoursLeft, daysLeft);}
    else{countUp(secondsLeft, minutesLeft, hoursLeft, daysLeft);}
}

//function to count down for launches in the future
function countDown(seconds, minutes, hours, days){
    var seconds = seconds;
    var minutes = minutes;
    var hours = hours;
    var days = days;

    //Main countdown clock
    interval = setInterval(function(){

        //Determine what happens happens when we get to the end of a minute, hour, or day
        seconds--;
        if(seconds<0){
            minutes--;
            seconds = 60;
        }
        if(minutes<0){
            hours--;
            minutes = 60;
        }
        if(hours<0){
            days--;
            hours = 24;
        }
        //console.log("Days: "+days);
        //console.log("Hours: "+hours);
        //console.log("Minutes: "+minutes);
        //console.log("Seconds: "+secondsLeft);
        updateTimer(days,hours,minutes,seconds);
    }, 1000);
}

//function to count up for launches that have already happened
function countUp(seconds, minutes, hours, days){
    var seconds = seconds;
    var minutes = minutes;
    var hours = hours;
    var days = days;

    //Main countup clock
    interval = setInterval(function(){

        //Determine what happens happens when we get to the end of a minute, hour, or day
        seconds++;
        if(seconds>59){
            minutes++;
            seconds = 0;
        }
        if(minutes>59){
            hours++;
            minutes = 0;
        }
        if(hours>23){
            days++;
            hours = 0;
        }
        //console.log("Days: "+days);
        //console.log("Hours: "+hours);
        //console.log("Minutes: "+minutes);
        //console.log("Seconds: "+secondsLeft);
        updateTimer(days,hours,minutes,seconds);
    }, 1000);
}

//uses a mod function to find leftover seconds after calculating days
function calculateDays(seconds){
    return seconds % 86400;
}

//uses mod function to find leftover seconds after calculating hours, use after calculateDays(seconds)
function calculateHours(seconds){
    return seconds % 3600;
}

//uses mod function to find leftover seconds after calculating minutes, use after calculateHours(seconds)
function calculateMinutes(seconds){
    return seconds % 60;
}

//creates boxes for the time intervals
//TODO add another box with a T+/- for up or down
function setupTimer(){
    var labels = ["Days:", "Hours:", "Minutes:", "Seconds:"];
    for(i=0; i<labels.length; i++){
        //setup the boxes for the numbers
        var $newBox = $("<div>");
        $newBox.addClass("timer");
        $newBox.attr("id","box-"+i);
        $timerContainer.append($newBox);

        //setup the numbers in the boxes
        var $newNum = $("<h1>");
        $newNum.addClass("number");
        $newNum.attr("id", "num-"+i);
        $newNum.text(0);
        $newBox.append($newNum);

        //setup the labels in the boxes
        var $newName = $("<h2>");
        $newName.addClass("label");
        $newName.attr("id", "label-"+i);
        $newBox.prepend($newName);
    }
    for (i=0; i<labels.length; i++){
        var $currentLabel = $("#label-"+i);
        $currentLabel.text(labels[i]);
    }
}

//update timer function will fill in the content of the boxes
function updateTimer(days, hours, minutes, seconds){
    var $dayNum = $("#num-0");
    var $hourNum = $("#num-1");
    var $minuteNum = $("#num-2");
    var $secondNum = $("#num-3");

    $dayNum.text(days);
    $hourNum.text(hours);
    $minuteNum.text(minutes);
    $secondNum.text(seconds);
}

//calling functions
//Todo, add the call function button here on the main page
setupTimer();
loadInfo(standard);